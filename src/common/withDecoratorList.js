import React, {useEffect, useState} from 'react';
import {hooks} from "../helper";
import useEvent from "@kne/use-event";
import classnames from "classnames";
import withItem from './withItem';
import withFetchList from './withFetchList';
import {View} from '@tarojs/components';

const {useOnChange} = hooks;

const withDecoratorList = (LabelComponent, hasFetch) => (WrappedComponent) => {
  const FieldComponent = ({emitter, ...props}) => {
    const [active, setActive] = useState(false);

    useEffect(() => {
      const token = emitter && emitter.addListener('show', () => setActive(true));
      return () => {
        token && token.remove();
      };
    }, [emitter]);

    return <>
      <LabelComponent {...props} showPopup={() => {
        setActive(true);
      }}/>
      <WrappedComponent {...props} visible={active} onClose={() => {
        setActive(false);
      }}/>
    </>
  };

  FieldComponent.defaultProps = {
    render: ({label, placeholder, onClick}) => {
      return <View className={classnames({
        "react-form__placeholder": !label
      })} onClick={onClick}>{label || placeholder}</View>
    }
  };

  const Field = (props) => {
    const render = useOnChange(Object.assign({placeholder: `请选择${props.label}`}, props));
    return render(FieldComponent);
  };

  Field.defaultProps = {};

  const withEvent = (WrappedComponent) => (props) => {
    const emitter = useEvent();
    return <WrappedComponent {...props} onClick={() => {
      emitter.emit('show');
    }} emitter={emitter}/>
  };

  Field.Item = withEvent(withItem(Field));

  if (hasFetch) {
    const FetchField = withFetchList(FieldComponent);

    Field.Fetch = FetchField;

    Field.FetchItem = withEvent(withItem(FetchField));
  }
  return Field;
};

export default withDecoratorList;
