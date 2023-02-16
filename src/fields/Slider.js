import React from 'react';
import {Slider} from '@kne/antd-taro';
import {hooks} from '../helper';
import withItem from "../common/withItem";

const {useDecorator} = hooks;

const SliderField = (props) => {
  const render = useDecorator(Object.assign({}, props));
  return render(Slider);
};

Slider.Item = withItem(SliderField);

export default Slider;
