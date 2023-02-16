import React, {useCallback} from 'react';
import classnames from 'classnames';
import {FieldPropsProvider} from './useFieldProps';
import {View} from '@tarojs/components';

const useUIDecorator = props => {
  const {
    id,
    name,
    rule,
    description,
    className,
    label,
    errMsg,
    errState,
    isValueChanged,
    fieldRef,
    formState,
    groupIndex,
    groupName,
    formData,
    ...others
  } = props;
  return useCallback(WrappedComponent => {
    return (<FieldPropsProvider props={props}>
      <WrappedComponent {...others} className={classnames('react-form__field-component', className)}/>
      {description ? <div className="react-form__field-describable">{description}</div> : null}
      {errMsg ? <View className="react-form__field-error">{errMsg}</View> : null}
    </FieldPropsProvider>);
  }, [others, className]);
};

export default useUIDecorator;
