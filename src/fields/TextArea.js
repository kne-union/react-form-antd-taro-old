import React from 'react';
import {TextArea} from '@kne/antd-taro';
import {hooks} from '../helper';
import withItem from "../common/withItem";

const {useDecorator} = hooks;

const TextAreaField = (props) => {
  const render = useDecorator(Object.assign({placeholder: `请输入${props.label}`}, props));
  return render(TextArea);
};

TextAreaField.Item = withItem(TextAreaField);

export default TextAreaField;
