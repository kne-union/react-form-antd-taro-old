import React, {useMemo} from 'react';
import {Picker as AntdPicker, DatePicker, DatePickerRange} from '@kne/antd-taro';
import withDecoratorList from '../common/withDecoratorList';
import dayjs from 'dayjs';

const Picker = withDecoratorList(({render, placeholder, showPopup, value, columns}) => {
  const label = useMemo(() => {
    if (!value) {
      return '';
    }
    return value.map((value, index) => {
      const item = (columns[index] || []).find((item) => item.value === value);
      if (item) {
        return item.label || item.value;
      }
      return '';
    }).filter((item) => !!item).join(',');
  }, [value, columns]);
  return render({
    label, value, placeholder, onClick: showPopup
  });
}, true)(AntdPicker);

Picker.DatePicker = withDecoratorList(({render, placeholder, showPopup, value, format}) => {
  const label = useMemo(() => {
    if (!value) {
      return '';
    }
    if (value === 'sofar') {
      return '至今';
    }
    return dayjs(value).format(format);
  }, [value]);
  return render({
    label, value, placeholder, onClick: showPopup
  });
})(DatePicker);

Picker.DatePicker.defaultProps = {
  format: 'YYYY-MM-DD'
};

Picker.DatePickerRange = withDecoratorList(({render, placeholder, showPopup, value, format}) => {
  const label = useMemo(() => {
    if (!value) {
      return '';
    }
    return value.map((value) => value === 'sofar' ? '至今' : dayjs(value).format(format)).join('~');
  }, [value]);

  return render({
    label, value, placeholder, onClick: showPopup
  });
})(DatePickerRange);

Picker.DatePickerRange.defaultProps = {
  format: 'YYYY-MM'
};


export default Picker;
