import React, {useMemo, useState, useRef} from "react";
import {CheckList, Popup, NavBar, Button} from "@kne/antd-taro";
import withDecoratorList from '../common/withDecoratorList';

const CheckListPopup = ({
                          value, visible, onClose, placeholder, onChange, options, children, ...props
                        }) => {
  const [pickerValue, setPickerValue] = useState(value);
  const initValueRef = useRef(value);
  initValueRef.current = value;
  const closeHandler = () => {
    setPickerValue(initValueRef.current);
    onClose();
  };

  return <Popup bodyClassName="react-form__popup" visible={visible} onClose={closeHandler} position="right">
    <NavBar backArrow={<Button color='primary' fill='none'>返回</Button>}
            right={<Button color='primary' fill='none' onClick={() => {
              initValueRef.current = pickerValue;
              onChange(pickerValue);
              closeHandler();
            }}>确定</Button>} onBack={() => {
      closeHandler();
    }}>{placeholder}</NavBar>
    <CheckList {...props} options={options} onChange={(value) => {
      setPickerValue(value);
    }} value={pickerValue}>
      {children || options.map(({label, value, ...others}) => <CheckList.Item {...others} value={value}
                                                                              key={value}>{label}</CheckList.Item>)}
    </CheckList>
  </Popup>;
};

const CheckListInput = ({render, options, placeholder, value, showPopup}) => {
  const label = useMemo(() => {
    if (!value) {
      return '';
    }
    return value.map((value) => {
      const item = (options || []).find((item) => item.value === value);
      if (item) {
        return item.label || item.value;
      }
      return '';
    }).filter((item) => !!item).join(',');
  }, [value, options]);
  return render({
    label, value, placeholder, onClick: showPopup
  });
};

const CheckListField = withDecoratorList(CheckListInput, true)(CheckListPopup);

export default CheckListField;
