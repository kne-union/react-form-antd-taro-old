import {preset as presetRules, RULES} from '@kne/react-form';
import {preset as fetchPreset} from '@kne/react-fetch';
import axios from 'taro-axios';
import merge from 'lodash/merge';

let baseUrlPrefix = '';

export const baseURL = baseUrlPrefix;

const oldREQ = RULES.REQ;
presetRules({
  REQ: (...props) => {
    return Object.assign({}, oldREQ(...props), {errMsg: '%s不能为空'});
  }
});

export const globalParams = {
  rules: {}, field: {
    imageUploader: {
      upload: (file) => {
        return {
          url: URL.createObjectURL(file),
        }
      }
    }
  }
};

export const ajax = axios.create({
  baseURL
})

fetchPreset({
  loading: null, ajax, transformResponse: (response) => {
    const {data} = response;
    response.data = {
      code: data.code === 0 || data.code === 401 ? 200 : data.code, msg: data.msg, results: data.data
    };
    return response;
  }
});

export default (props) => {
  merge(globalParams, props);
  presetRules(globalParams.rules);
};
