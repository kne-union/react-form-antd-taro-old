import React from 'react';
import {useReset} from '@kne/react-form';
import {Button} from '@kne/antd-taro';

const ResetButton = (props) => {
  const resetProps = useReset();
  return (
    <Button {...resetProps} {...props}/>
  );
};

export default ResetButton;
