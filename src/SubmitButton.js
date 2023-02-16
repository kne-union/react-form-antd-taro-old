import React from 'react';
import {useSubmit} from '@kne/react-form';
import {Button} from '@kne/antd-taro';

const SubmitButton = ({realTime, disabled, ...props}) => {
  const {isPass, isLoading, ...submitProps} = useSubmit(props);
  return (
    <Button loading={isLoading} disabled={disabled || (realTime ? !isPass : false)} {...submitProps} {...props}/>);
};

SubmitButton.defaultProps = {
  block: true, color: 'primary', disabled: false
};

export default SubmitButton;
