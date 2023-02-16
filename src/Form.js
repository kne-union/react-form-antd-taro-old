import React, {forwardRef} from 'react';
import ReactForm from '@kne/react-form';
import classnames from 'classnames';
import {View} from '@tarojs/components';
import Taro from '@tarojs/taro';
import './assets/index.scss';

export * from '@kne/react-form';
export {hooks, widget, utils} from './helper';

const Form = forwardRef(({
                           className, scrollToError, onError, children, ...props
                         }, ref) => {
  return <View className={classnames(className, 'react-form')}>
    <ReactForm {...props} onError={(errors) => {
      errors && errors.length > 0 && Taro.showToast({
        title: errors.map(({errMsg}) => errMsg).join(','), duration: 2000, icon: 'none'
      });
    }} ref={ref}>
      {children}
    </ReactForm>
  </View>;
});

Form.defaultProps = {
  scrollToError: true
};

export default Form;
