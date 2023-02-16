import React, { useCallback, useRef, useEffect, createContext, useContext, forwardRef, useImperativeHandle, useState, useMemo } from 'react';
import ReactForm__default, { useField, preset as preset$1, RULES, useReset, useSubmit } from '@kne/react-form';
export * from '@kne/react-form';
import classnames from 'classnames';
import { View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import merge from 'lodash/merge';
import { List, Popup, NavBar, Button, CheckList as CheckList$1, Input as Input$1, Picker as Picker$2, DatePicker, DatePickerRange, Selector as Selector$1, Slider as Slider$1, Switch as Switch$2, TextArea as TextArea$1 } from '@kne/antd-taro';
import useEvent from '@kne/use-event';
import { withFetch, preset as preset$2 } from '@kne/react-fetch';
import dayjs from 'dayjs';
import axios from 'taro-axios';

function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}

const _excluded$9 = ["triggerValidate", "onBlur"];
const useBlurDecorator = _ref => {
  let {
      triggerValidate,
      onBlur
    } = _ref,
    others = _objectWithoutPropertiesLoose(_ref, _excluded$9);
  const handlerBlur = useCallback((...args) => {
    onBlur && onBlur(...args);
    triggerValidate();
  }, [onBlur, triggerValidate]);
  return _extends({
    onBlur: handlerBlur
  }, others);
};

const _excluded$8 = ["triggerValidate", "value", "onChange"];
const useChangeDecorator = _ref => {
  let {
      triggerValidate,
      value,
      onChange
    } = _ref,
    others = _objectWithoutPropertiesLoose(_ref, _excluded$8);
  const hasChanged = useRef(false),
    validate = useRef(void 0);
  const handlerChange = useCallback((...args) => {
    onChange && onChange(...args);
    hasChanged.current = true;
  }, [onChange]);
  useEffect(() => {
    validate.current = triggerValidate;
  }, [triggerValidate]);
  useEffect(() => {
    hasChanged.current && validate.current();
  }, [value]);
  return _extends({
    value,
    onChange: handlerChange
  }, others);
};

const _excluded$7 = ["checked"],
  _excluded2$3 = ["value"];
const useCheckedToValue$1 = _ref => {
  let {
      checked
    } = _ref,
    props = _objectWithoutPropertiesLoose(_ref, _excluded$7);
  return _extends({}, props, {
    value: checked
  });
};
const withChecked$1 = WrappedComponent => {
  return _ref2 => {
    let {
        value
      } = _ref2,
      props = _objectWithoutPropertiesLoose(_ref2, _excluded2$3);
    return /*#__PURE__*/React.createElement(WrappedComponent, _extends({}, props, {
      checked: value
    }));
  };
};

const context = createContext({});
const useFieldProps = () => {
  return useContext(context);
};
const {
  Provider
} = context;
const FieldPropsProvider = ({
  props,
  children
}) => {
  return /*#__PURE__*/React.createElement(Provider, {
    value: props
  }, children);
};

const _excluded$6 = ["id", "name", "rule", "description", "className", "label", "errMsg", "errState", "isValueChanged", "fieldRef", "formState", "groupIndex", "groupName", "formData"];
const useUIDecorator = props => {
  const {
      description,
      className,
      errMsg
    } = props,
    others = _objectWithoutPropertiesLoose(props, _excluded$6);
  return useCallback(WrappedComponent => {
    return /*#__PURE__*/React.createElement(FieldPropsProvider, {
      props: props
    }, /*#__PURE__*/React.createElement(WrappedComponent, _extends({}, others, {
      className: classnames('react-form__field-component', className)
    })), description ? /*#__PURE__*/React.createElement("div", {
      className: "react-form__field-describable"
    }, description) : null, errMsg ? /*#__PURE__*/React.createElement(View, {
      className: "react-form__field-error"
    }, errMsg) : null);
  }, [others, className]);
};

const globalParams$1 = {
  field: {}
};

const _excluded$5 = ["fieldName"],
  _excluded2$2 = ["realtime"];
const defaultPropsAssign = _ref => {
  let {
      fieldName
    } = _ref,
    props = _objectWithoutPropertiesLoose(_ref, _excluded$5);
  return Object.assign({}, globalParams$1.field[fieldName], props);
};
const useDecorator$3 = _ref2 => {
  let {
      realtime
    } = _ref2,
    props = _objectWithoutPropertiesLoose(_ref2, _excluded2$2);
  const fieldProps = useField(defaultPropsAssign(Object.assign(realtime ? {
      debounce: 500
    } : {}, props))),
    changeProps = useChangeDecorator(fieldProps),
    blurProps = useBlurDecorator(fieldProps),
    realtimeProps = Object.assign({}, blurProps, changeProps);
  return useUIDecorator(realtime ? realtimeProps : blurProps);
};
const useOnChange$4 = props => {
  const fieldProps = useField(defaultPropsAssign(props)),
    changeProps = useChangeDecorator(fieldProps);
  return useUIDecorator(changeProps);
};
const useOnBlur = props => {
  const fieldProps = useField(defaultPropsAssign(props)),
    blurProps = useBlurDecorator(fieldProps);
  return useUIDecorator(blurProps);
};

const hooks = {
  useField,
  useFieldProps,
  useBlurDecorator,
  useChangeDecorator,
  useCheckedToValue: useCheckedToValue$1,
  useDecorator: useDecorator$3,
  useOnBlur,
  useOnChange: useOnChange$4,
  useUIDecorator
};
const hoc = {
  withChecked: withChecked$1
};
const widget = {};
const utils = {};

const _excluded$4 = ["className", "scrollToError", "onError", "children"];
const Form = forwardRef((_ref, ref) => {
  let {
      className,
      children
    } = _ref,
    props = _objectWithoutPropertiesLoose(_ref, _excluded$4);
  return /*#__PURE__*/React.createElement(View, {
    className: classnames(className, 'react-form')
  }, /*#__PURE__*/React.createElement(ReactForm__default, _extends({}, props, {
    onError: errors => {
      errors && errors.length > 0 && Taro.showToast({
        title: errors.map(({
          errMsg
        }) => errMsg).join(','),
        duration: 2000,
        icon: 'none'
      });
    },
    ref: ref
  }), children));
});
Form.defaultProps = {
  scrollToError: true
};

const withItem = WrappedComponent => props => {
  const listProps = props.labelHidden === true ? {} : {
    title: props.label
  };
  return /*#__PURE__*/React.createElement(List.Item, _extends({}, listProps, {
    className: classnames('react-form-list-item', {
      'is-req': typeof props.rule === 'string' && (props.rule || '').split(' ').indexOf('REQ') > -1
    })
  }), /*#__PURE__*/React.createElement(WrappedComponent, _extends({}, props, {
    labelHidden: true
  })));
};

const _excluded$3 = ["data", "setData", "refresh", "reload", "fetchEmitter", "isLoading", "children", "onLoaded"];
const {
  useOnChange: useOnChange$3
} = hooks;
const withFetchList = WrappedComponent => {
  const FieldInner = withFetch(_ref => {
    let {
        data,
        setData,
        refresh,
        reload,
        fetchEmitter,
        isLoading,
        children,
        onLoaded
      } = _ref,
      props = _objectWithoutPropertiesLoose(_ref, _excluded$3);
    const refreshRef = useRef(refresh);
    refreshRef.current = refresh;
    const reloadRef = useRef(reload);
    reloadRef.current = reload;
    const setDataRef = useRef(setData);
    setDataRef.current = setData;
    const dataRef = useRef(data);
    useEffect(() => {
      const token1 = fetchEmitter.addListener('select-fetch-refresh', () => refreshRef.current());
      const token2 = fetchEmitter.addListener('select-fetch-reload', () => reloadRef.current());
      const token3 = fetchEmitter.addListener('select-fetch-set-data', () => setDataRef.current());
      return () => {
        token1 && token1.remove();
        token2 && token2.remove();
        token3 && token3.remove();
      };
    }, [fetchEmitter]);
    useEffect(() => {
      onLoaded && onLoaded(dataRef.current);
    }, []);
    return /*#__PURE__*/React.createElement(WrappedComponent, _extends({}, props, children({
      data,
      refresh,
      isLoading,
      setData
    })));
  });
  const FetchComponent = forwardRef((props, ref) => {
    const fetchEmitter = useEvent();
    useImperativeHandle(ref, () => {
      return {
        refresh: () => fetchEmitter.emit('select-fetch-refresh'),
        reload: () => fetchEmitter.emit('select-fetch-reload'),
        setData: data => fetchEmitter.emit('select-fetch-set-data', data)
      };
    }, [fetchEmitter]);
    const render = useOnChange$3(Object.assign({
      placeholder: `请选择${props.label}`
    }, props, {
      fetchEmitter
    }));
    return render(FieldInner);
  });
  return FetchComponent;
};

const _excluded$2 = ["emitter"];
const {
  useOnChange: useOnChange$2
} = hooks;
const withDecoratorList = (LabelComponent, hasFetch) => WrappedComponent => {
  const FieldComponent = _ref => {
    let {
        emitter
      } = _ref,
      props = _objectWithoutPropertiesLoose(_ref, _excluded$2);
    const [active, setActive] = useState(false);
    useEffect(() => {
      const token = emitter && emitter.addListener('show', () => setActive(true));
      return () => {
        token && token.remove();
      };
    }, [emitter]);
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(LabelComponent, _extends({}, props, {
      showPopup: () => {
        setActive(true);
      }
    })), /*#__PURE__*/React.createElement(WrappedComponent, _extends({}, props, {
      visible: active,
      onClose: () => {
        setActive(false);
      }
    })));
  };
  FieldComponent.defaultProps = {
    render: ({
      label,
      placeholder,
      onClick
    }) => {
      return /*#__PURE__*/React.createElement(View, {
        className: classnames({
          "react-form__placeholder": !label
        }),
        onClick: onClick
      }, label || placeholder);
    }
  };
  const Field = props => {
    const render = useOnChange$2(Object.assign({
      placeholder: `请选择${props.label}`
    }, props));
    return render(FieldComponent);
  };
  Field.defaultProps = {};
  const withEvent = WrappedComponent => props => {
    const emitter = useEvent();
    return /*#__PURE__*/React.createElement(WrappedComponent, _extends({}, props, {
      onClick: () => {
        emitter.emit('show');
      },
      emitter: emitter
    }));
  };
  Field.Item = withEvent(withItem(Field));
  if (hasFetch) {
    const FetchField = withFetchList(FieldComponent);
    Field.Fetch = FetchField;
    Field.FetchItem = withEvent(withItem(FetchField));
  }
  return Field;
};

const _excluded$1 = ["value", "visible", "onClose", "placeholder", "onChange", "options", "children"],
  _excluded2$1 = ["label", "value"];
const CheckListPopup = _ref => {
  let {
      value,
      visible,
      onClose,
      placeholder,
      onChange,
      options,
      children
    } = _ref,
    props = _objectWithoutPropertiesLoose(_ref, _excluded$1);
  const [pickerValue, setPickerValue] = useState(value);
  const initValueRef = useRef(value);
  initValueRef.current = value;
  const closeHandler = () => {
    setPickerValue(initValueRef.current);
    onClose();
  };
  return /*#__PURE__*/React.createElement(Popup, {
    bodyClassName: "react-form__popup",
    visible: visible,
    onClose: closeHandler,
    position: "right"
  }, /*#__PURE__*/React.createElement(NavBar, {
    backArrow: /*#__PURE__*/React.createElement(Button, {
      color: "primary",
      fill: "none"
    }, "\u8FD4\u56DE"),
    right: /*#__PURE__*/React.createElement(Button, {
      color: "primary",
      fill: "none",
      onClick: () => {
        initValueRef.current = pickerValue;
        onChange(pickerValue);
        closeHandler();
      }
    }, "\u786E\u5B9A"),
    onBack: () => {
      closeHandler();
    }
  }, placeholder), /*#__PURE__*/React.createElement(CheckList$1, _extends({}, props, {
    options: options,
    onChange: value => {
      setPickerValue(value);
    },
    value: pickerValue
  }), children || options.map(_ref2 => {
    let {
        label,
        value
      } = _ref2,
      others = _objectWithoutPropertiesLoose(_ref2, _excluded2$1);
    return /*#__PURE__*/React.createElement(CheckList$1.Item, _extends({}, others, {
      value: value,
      key: value
    }), label);
  })));
};
const CheckListInput = ({
  render,
  options,
  placeholder,
  value,
  showPopup
}) => {
  const label = useMemo(() => {
    if (!value) {
      return '';
    }
    return value.map(value => {
      const item = (options || []).find(item => item.value === value);
      if (item) {
        return item.label || item.value;
      }
      return '';
    }).filter(item => !!item).join(',');
  }, [value, options]);
  return render({
    label,
    value,
    placeholder,
    onClick: showPopup
  });
};
const CheckListField = withDecoratorList(CheckListInput, true)(CheckListPopup);

const {
  useDecorator: useDecorator$2
} = hooks;
const InputField = props => {
  const render = useDecorator$2(Object.assign({
    placeholder: `请输入${props.label}`
  }, props));
  return render(Input$1);
};
InputField.Item = withItem(InputField);

const Picker$1 = withDecoratorList(({
  render,
  placeholder,
  showPopup,
  value,
  columns
}) => {
  const label = useMemo(() => {
    if (!value) {
      return '';
    }
    return value.map((value, index) => {
      const item = (columns[index] || []).find(item => item.value === value);
      if (item) {
        return item.label || item.value;
      }
      return '';
    }).filter(item => !!item).join(',');
  }, [value, columns]);
  return render({
    label,
    value,
    placeholder,
    onClick: showPopup
  });
}, true)(Picker$2);
Picker$1.DatePicker = withDecoratorList(({
  render,
  placeholder,
  showPopup,
  value,
  format
}) => {
  const label = useMemo(() => {
    if (!value) {
      return '';
    }
    return dayjs(value).format(format);
  }, [value]);
  return render({
    label,
    value,
    placeholder,
    onClick: showPopup
  });
})(DatePicker);
Picker$1.DatePicker.defaultProps = {
  format: 'YYYY-MM-DD'
};
Picker$1.DatePickerRange = withDecoratorList(({
  render,
  placeholder,
  showPopup,
  value,
  format
}) => {
  const label = useMemo(() => {
    if (!value) {
      return '';
    }
    return value.map(value => value === 'sofar' ? '至今' : dayjs(value).format(format)).join('~');
  }, [value]);
  return render({
    label,
    value,
    placeholder,
    onClick: showPopup
  });
})(DatePickerRange);
Picker$1.DatePickerRange.defaultProps = {
  format: 'YYYY-MM'
};

const {
  useOnChange: useOnChange$1
} = hooks;
const SelectorField = props => {
  const render = useOnChange$1(props);
  return render(Selector$1);
};
SelectorField.Item = withItem(SelectorField);
SelectorField.Fetch = withFetchList(Selector$1);
SelectorField.FetchItem = withItem(SelectorField.Fetch);

const {
  useDecorator: useDecorator$1
} = hooks;
const SliderField = props => {
  const render = useDecorator$1(Object.assign({}, props));
  return render(Slider$1);
};
Slider$1.Item = withItem(SliderField);

const {
  useOnChange,
  useCheckedToValue
} = hooks;
const {
  withChecked
} = hoc;
const WithSwitch = withChecked(Switch$2);
const Switch$1 = props => {
  const checkedProps = useCheckedToValue(props);
  const render = useOnChange(checkedProps);
  return render(WithSwitch);
};
Switch$1.Item = withItem(Switch$1);

const {
  useDecorator
} = hooks;
const TextAreaField = props => {
  const render = useDecorator(Object.assign({
    placeholder: `请输入${props.label}`
  }, props));
  return render(TextArea$1);
};
TextAreaField.Item = withItem(TextAreaField);

let baseUrlPrefix = '';
const baseURL = baseUrlPrefix;
const oldREQ = RULES.REQ;
preset$1({
  REQ: (...props) => {
    return Object.assign({}, oldREQ(...props), {
      errMsg: '%s不能为空'
    });
  }
});
const globalParams = {
  rules: {},
  field: {
    imageUploader: {
      upload: file => {
        return {
          url: URL.createObjectURL(file)
        };
      }
    }
  }
};
const ajax = axios.create({
  baseURL
});
preset$2({
  loading: null,
  ajax,
  transformResponse: response => {
    const {
      data
    } = response;
    response.data = {
      code: data.code === 0 || data.code === 401 ? 200 : data.code,
      msg: data.msg,
      results: data.data
    };
    return response;
  }
});
var preset = (props => {
  merge(globalParams, props);
  preset$1(globalParams.rules);
});

const ResetButton = props => {
  const resetProps = useReset();
  return /*#__PURE__*/React.createElement(Button, _extends({}, resetProps, props));
};

const _excluded = ["realTime", "disabled"],
  _excluded2 = ["isPass", "isLoading"];
const SubmitButton = _ref => {
  let {
      realTime,
      disabled
    } = _ref,
    props = _objectWithoutPropertiesLoose(_ref, _excluded);
  const _useSubmit = useSubmit(props),
    {
      isPass,
      isLoading
    } = _useSubmit,
    submitProps = _objectWithoutPropertiesLoose(_useSubmit, _excluded2);
  return /*#__PURE__*/React.createElement(Button, _extends({
    loading: isLoading,
    disabled: disabled || (realTime ? !isPass : false)
  }, submitProps, props));
};
SubmitButton.defaultProps = {
  block: true,
  color: 'primary',
  disabled: false
};

const CheckList = CheckListField;
const Input = InputField;
const Picker = Picker$1;
const Selector = SelectorField;
const Slider = Slider$1;
const Switch = Switch$1;
const TextArea = TextAreaField;
const fields = {
  CheckList,
  Input,
  Picker,
  Selector,
  Slider,
  Switch,
  TextArea
};

export { CheckList, Input, Picker, ResetButton, Selector, Slider, SubmitButton, Switch, TextArea, Form as default, fields, hooks, preset, utils, widget };
//# sourceMappingURL=react-form-antd-taro.modern.mjs.map
