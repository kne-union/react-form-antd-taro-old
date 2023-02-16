import React from 'react';
import {Input} from '@kne/antd-taro';
import {hooks} from '../helper';
import withItem from "../common/withItem";

const {useDecorator} = hooks;

const InputField = (props) => {
  const render = useDecorator(Object.assign({placeholder: `请输入${props.label}`}, props));
  return render(Input);
};

InputField.Item = withItem(InputField);

export default InputField;
