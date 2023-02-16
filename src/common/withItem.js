import React from 'react';
import {List} from "@kne/antd-taro";
import classnames from 'classnames';

const withItem = (WrappedComponent) => (props) => {
  const listProps = props.labelHidden === true ? {} : {title: props.label};
  return <List.Item {...listProps} className={classnames('react-form-list-item', {
    'is-req': typeof props.rule === 'string' && (props.rule || '').split(' ').indexOf('REQ') > -1
  })}>
    <WrappedComponent {...props} labelHidden/>
  </List.Item>
};

export default withItem;
