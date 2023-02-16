var React = require('react');
var ReactForm = require('@kne/react-form');
var classnames = require('classnames');
var components = require('@tarojs/components');
var Taro = require('@tarojs/taro');
var merge = require('lodash/merge');
var antdTaro = require('@kne/antd-taro');
var useEvent = require('@kne/use-event');
var reactFetch = require('@kne/react-fetch');
var dayjs = require('dayjs');
var axios = require('taro-axios');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var ReactForm__default = /*#__PURE__*/_interopDefaultLegacy(ReactForm);
var classnames__default = /*#__PURE__*/_interopDefaultLegacy(classnames);
var Taro__default = /*#__PURE__*/_interopDefaultLegacy(Taro);
var merge__default = /*#__PURE__*/_interopDefaultLegacy(merge);
var useEvent__default = /*#__PURE__*/_interopDefaultLegacy(useEvent);
var dayjs__default = /*#__PURE__*/_interopDefaultLegacy(dayjs);
var axios__default = /*#__PURE__*/_interopDefaultLegacy(axios);

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

var _excluded$9 = ["triggerValidate", "onBlur"];
var useBlurDecorator = function useBlurDecorator(_ref) {
  var triggerValidate = _ref.triggerValidate,
    onBlur = _ref.onBlur,
    others = _objectWithoutPropertiesLoose(_ref, _excluded$9);
  var handlerBlur = React.useCallback(function () {
    onBlur && onBlur.apply(void 0, [].slice.call(arguments));
    triggerValidate();
  }, [onBlur, triggerValidate]);
  return _extends({
    onBlur: handlerBlur
  }, others);
};

var _excluded$8 = ["triggerValidate", "value", "onChange"];
var useChangeDecorator = function useChangeDecorator(_ref) {
  var triggerValidate = _ref.triggerValidate,
    value = _ref.value,
    onChange = _ref.onChange,
    others = _objectWithoutPropertiesLoose(_ref, _excluded$8);
  var hasChanged = React.useRef(false),
    validate = React.useRef(void 0);
  var handlerChange = React.useCallback(function () {
    onChange && onChange.apply(void 0, [].slice.call(arguments));
    hasChanged.current = true;
  }, [onChange]);
  React.useEffect(function () {
    validate.current = triggerValidate;
  }, [triggerValidate]);
  React.useEffect(function () {
    hasChanged.current && validate.current();
  }, [value]);
  return _extends({
    value: value,
    onChange: handlerChange
  }, others);
};

var _excluded$7 = ["checked"],
  _excluded2$3 = ["value"];
var useCheckedToValue$1 = function useCheckedToValue(_ref) {
  var checked = _ref.checked,
    props = _objectWithoutPropertiesLoose(_ref, _excluded$7);
  return _extends({}, props, {
    value: checked
  });
};
var withChecked$1 = function withChecked(WrappedComponent) {
  return function (_ref2) {
    var value = _ref2.value,
      props = _objectWithoutPropertiesLoose(_ref2, _excluded2$3);
    return /*#__PURE__*/React__default["default"].createElement(WrappedComponent, _extends({}, props, {
      checked: value
    }));
  };
};

var context = React.createContext({});
var useFieldProps = function useFieldProps() {
  return React.useContext(context);
};
var Provider = context.Provider;
var FieldPropsProvider = function FieldPropsProvider(_ref) {
  var props = _ref.props,
    children = _ref.children;
  return /*#__PURE__*/React__default["default"].createElement(Provider, {
    value: props
  }, children);
};

var _excluded$6 = ["id", "name", "rule", "description", "className", "label", "errMsg", "errState", "isValueChanged", "fieldRef", "formState", "groupIndex", "groupName", "formData"];
var useUIDecorator = function useUIDecorator(props) {
  var description = props.description,
    className = props.className,
    errMsg = props.errMsg,
    others = _objectWithoutPropertiesLoose(props, _excluded$6);
  return React.useCallback(function (WrappedComponent) {
    return /*#__PURE__*/React__default["default"].createElement(FieldPropsProvider, {
      props: props
    }, /*#__PURE__*/React__default["default"].createElement(WrappedComponent, _extends({}, others, {
      className: classnames__default["default"]('react-form__field-component', className)
    })), description ? /*#__PURE__*/React__default["default"].createElement("div", {
      className: "react-form__field-describable"
    }, description) : null, errMsg ? /*#__PURE__*/React__default["default"].createElement(components.View, {
      className: "react-form__field-error"
    }, errMsg) : null);
  }, [others, className]);
};

var globalParams$1 = {
  field: {}
};

var _excluded$5 = ["fieldName"],
  _excluded2$2 = ["realtime"];
var defaultPropsAssign = function defaultPropsAssign(_ref) {
  var fieldName = _ref.fieldName,
    props = _objectWithoutPropertiesLoose(_ref, _excluded$5);
  return Object.assign({}, globalParams$1.field[fieldName], props);
};
var useDecorator$3 = function useDecorator(_ref2) {
  var realtime = _ref2.realtime,
    props = _objectWithoutPropertiesLoose(_ref2, _excluded2$2);
  var fieldProps = ReactForm.useField(defaultPropsAssign(Object.assign(realtime ? {
      debounce: 500
    } : {}, props))),
    changeProps = useChangeDecorator(fieldProps),
    blurProps = useBlurDecorator(fieldProps),
    realtimeProps = Object.assign({}, blurProps, changeProps);
  return useUIDecorator(realtime ? realtimeProps : blurProps);
};
var useOnChange$4 = function useOnChange(props) {
  var fieldProps = ReactForm.useField(defaultPropsAssign(props)),
    changeProps = useChangeDecorator(fieldProps);
  return useUIDecorator(changeProps);
};
var useOnBlur = function useOnBlur(props) {
  var fieldProps = ReactForm.useField(defaultPropsAssign(props)),
    blurProps = useBlurDecorator(fieldProps);
  return useUIDecorator(blurProps);
};

var hooks = {
  useField: ReactForm.useField,
  useFieldProps: useFieldProps,
  useBlurDecorator: useBlurDecorator,
  useChangeDecorator: useChangeDecorator,
  useCheckedToValue: useCheckedToValue$1,
  useDecorator: useDecorator$3,
  useOnBlur: useOnBlur,
  useOnChange: useOnChange$4,
  useUIDecorator: useUIDecorator
};
var hoc = {
  withChecked: withChecked$1
};
var widget = {};
var utils = {};

var _excluded$4 = ["className", "scrollToError", "onError", "children"];
var Form = React.forwardRef(function (_ref, ref) {
  var className = _ref.className,
    children = _ref.children,
    props = _objectWithoutPropertiesLoose(_ref, _excluded$4);
  return /*#__PURE__*/React__default["default"].createElement(components.View, {
    className: classnames__default["default"](className, 'react-form')
  }, /*#__PURE__*/React__default["default"].createElement(ReactForm__default["default"], _extends({}, props, {
    onError: function onError(errors) {
      errors && errors.length > 0 && Taro__default["default"].showToast({
        title: errors.map(function (_ref2) {
          var errMsg = _ref2.errMsg;
          return errMsg;
        }).join(','),
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

var withItem = function withItem(WrappedComponent) {
  return function (props) {
    var listProps = props.labelHidden === true ? {} : {
      title: props.label
    };
    return /*#__PURE__*/React__default["default"].createElement(antdTaro.List.Item, _extends({}, listProps, {
      className: classnames__default["default"]('react-form-list-item', {
        'is-req': typeof props.rule === 'string' && (props.rule || '').split(' ').indexOf('REQ') > -1
      })
    }), /*#__PURE__*/React__default["default"].createElement(WrappedComponent, _extends({}, props, {
      labelHidden: true
    })));
  };
};

var _excluded$3 = ["data", "setData", "refresh", "reload", "fetchEmitter", "isLoading", "children", "onLoaded"];
var useOnChange$3 = hooks.useOnChange;
var withFetchList = function withFetchList(WrappedComponent) {
  var FieldInner = reactFetch.withFetch(function (_ref) {
    var data = _ref.data,
      setData = _ref.setData,
      refresh = _ref.refresh,
      reload = _ref.reload,
      fetchEmitter = _ref.fetchEmitter,
      isLoading = _ref.isLoading,
      children = _ref.children,
      onLoaded = _ref.onLoaded,
      props = _objectWithoutPropertiesLoose(_ref, _excluded$3);
    var refreshRef = React.useRef(refresh);
    refreshRef.current = refresh;
    var reloadRef = React.useRef(reload);
    reloadRef.current = reload;
    var setDataRef = React.useRef(setData);
    setDataRef.current = setData;
    var dataRef = React.useRef(data);
    React.useEffect(function () {
      var token1 = fetchEmitter.addListener('select-fetch-refresh', function () {
        return refreshRef.current();
      });
      var token2 = fetchEmitter.addListener('select-fetch-reload', function () {
        return reloadRef.current();
      });
      var token3 = fetchEmitter.addListener('select-fetch-set-data', function () {
        return setDataRef.current();
      });
      return function () {
        token1 && token1.remove();
        token2 && token2.remove();
        token3 && token3.remove();
      };
    }, [fetchEmitter]);
    React.useEffect(function () {
      onLoaded && onLoaded(dataRef.current);
    }, []);
    return /*#__PURE__*/React__default["default"].createElement(WrappedComponent, _extends({}, props, children({
      data: data,
      refresh: refresh,
      isLoading: isLoading,
      setData: setData
    })));
  });
  var FetchComponent = React.forwardRef(function (props, ref) {
    var fetchEmitter = useEvent__default["default"]();
    React.useImperativeHandle(ref, function () {
      return {
        refresh: function refresh() {
          return fetchEmitter.emit('select-fetch-refresh');
        },
        reload: function reload() {
          return fetchEmitter.emit('select-fetch-reload');
        },
        setData: function setData(data) {
          return fetchEmitter.emit('select-fetch-set-data', data);
        }
      };
    }, [fetchEmitter]);
    var render = useOnChange$3(Object.assign({
      placeholder: "\u8BF7\u9009\u62E9" + props.label
    }, props, {
      fetchEmitter: fetchEmitter
    }));
    return render(FieldInner);
  });
  return FetchComponent;
};

var _excluded$2 = ["emitter"];
var useOnChange$2 = hooks.useOnChange;
var withDecoratorList = function withDecoratorList(LabelComponent, hasFetch) {
  return function (WrappedComponent) {
    var FieldComponent = function FieldComponent(_ref) {
      var emitter = _ref.emitter,
        props = _objectWithoutPropertiesLoose(_ref, _excluded$2);
      var _useState = React.useState(false),
        active = _useState[0],
        setActive = _useState[1];
      React.useEffect(function () {
        var token = emitter && emitter.addListener('show', function () {
          return setActive(true);
        });
        return function () {
          token && token.remove();
        };
      }, [emitter]);
      return /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, /*#__PURE__*/React__default["default"].createElement(LabelComponent, _extends({}, props, {
        showPopup: function showPopup() {
          setActive(true);
        }
      })), /*#__PURE__*/React__default["default"].createElement(WrappedComponent, _extends({}, props, {
        visible: active,
        onClose: function onClose() {
          setActive(false);
        }
      })));
    };
    FieldComponent.defaultProps = {
      render: function render(_ref2) {
        var label = _ref2.label,
          placeholder = _ref2.placeholder,
          onClick = _ref2.onClick;
        return /*#__PURE__*/React__default["default"].createElement(components.View, {
          className: classnames__default["default"]({
            "react-form__placeholder": !label
          }),
          onClick: onClick
        }, label || placeholder);
      }
    };
    var Field = function Field(props) {
      var render = useOnChange$2(Object.assign({
        placeholder: "\u8BF7\u9009\u62E9" + props.label
      }, props));
      return render(FieldComponent);
    };
    Field.defaultProps = {};
    var withEvent = function withEvent(WrappedComponent) {
      return function (props) {
        var emitter = useEvent__default["default"]();
        return /*#__PURE__*/React__default["default"].createElement(WrappedComponent, _extends({}, props, {
          onClick: function onClick() {
            emitter.emit('show');
          },
          emitter: emitter
        }));
      };
    };
    Field.Item = withEvent(withItem(Field));
    if (hasFetch) {
      var FetchField = withFetchList(FieldComponent);
      Field.Fetch = FetchField;
      Field.FetchItem = withEvent(withItem(FetchField));
    }
    return Field;
  };
};

var _excluded$1 = ["value", "visible", "onClose", "placeholder", "onChange", "options", "children"],
  _excluded2$1 = ["label", "value"];
var CheckListPopup = function CheckListPopup(_ref) {
  var value = _ref.value,
    visible = _ref.visible,
    onClose = _ref.onClose,
    placeholder = _ref.placeholder,
    onChange = _ref.onChange,
    options = _ref.options,
    children = _ref.children,
    props = _objectWithoutPropertiesLoose(_ref, _excluded$1);
  var _useState = React.useState(value),
    pickerValue = _useState[0],
    setPickerValue = _useState[1];
  var initValueRef = React.useRef(value);
  initValueRef.current = value;
  var closeHandler = function closeHandler() {
    setPickerValue(initValueRef.current);
    onClose();
  };
  return /*#__PURE__*/React__default["default"].createElement(antdTaro.Popup, {
    bodyClassName: "react-form__popup",
    visible: visible,
    onClose: closeHandler,
    position: "right"
  }, /*#__PURE__*/React__default["default"].createElement(antdTaro.NavBar, {
    backArrow: /*#__PURE__*/React__default["default"].createElement(antdTaro.Button, {
      color: "primary",
      fill: "none"
    }, "\u8FD4\u56DE"),
    right: /*#__PURE__*/React__default["default"].createElement(antdTaro.Button, {
      color: "primary",
      fill: "none",
      onClick: function onClick() {
        initValueRef.current = pickerValue;
        onChange(pickerValue);
        closeHandler();
      }
    }, "\u786E\u5B9A"),
    onBack: function onBack() {
      closeHandler();
    }
  }, placeholder), /*#__PURE__*/React__default["default"].createElement(antdTaro.CheckList, _extends({}, props, {
    options: options,
    onChange: function onChange(value) {
      setPickerValue(value);
    },
    value: pickerValue
  }), children || options.map(function (_ref2) {
    var label = _ref2.label,
      value = _ref2.value,
      others = _objectWithoutPropertiesLoose(_ref2, _excluded2$1);
    return /*#__PURE__*/React__default["default"].createElement(antdTaro.CheckList.Item, _extends({}, others, {
      value: value,
      key: value
    }), label);
  })));
};
var CheckListInput = function CheckListInput(_ref3) {
  var render = _ref3.render,
    options = _ref3.options,
    placeholder = _ref3.placeholder,
    value = _ref3.value,
    showPopup = _ref3.showPopup;
  var label = React.useMemo(function () {
    if (!value) {
      return '';
    }
    return value.map(function (value) {
      var item = (options || []).find(function (item) {
        return item.value === value;
      });
      if (item) {
        return item.label || item.value;
      }
      return '';
    }).filter(function (item) {
      return !!item;
    }).join(',');
  }, [value, options]);
  return render({
    label: label,
    value: value,
    placeholder: placeholder,
    onClick: showPopup
  });
};
var CheckListField = withDecoratorList(CheckListInput, true)(CheckListPopup);

var useDecorator$2 = hooks.useDecorator;
var InputField = function InputField(props) {
  var render = useDecorator$2(Object.assign({
    placeholder: "\u8BF7\u8F93\u5165" + props.label
  }, props));
  return render(antdTaro.Input);
};
InputField.Item = withItem(InputField);

var Picker$1 = withDecoratorList(function (_ref) {
  var render = _ref.render,
    placeholder = _ref.placeholder,
    showPopup = _ref.showPopup,
    value = _ref.value,
    columns = _ref.columns;
  var label = React.useMemo(function () {
    if (!value) {
      return '';
    }
    return value.map(function (value, index) {
      var item = (columns[index] || []).find(function (item) {
        return item.value === value;
      });
      if (item) {
        return item.label || item.value;
      }
      return '';
    }).filter(function (item) {
      return !!item;
    }).join(',');
  }, [value, columns]);
  return render({
    label: label,
    value: value,
    placeholder: placeholder,
    onClick: showPopup
  });
}, true)(antdTaro.Picker);
Picker$1.DatePicker = withDecoratorList(function (_ref2) {
  var render = _ref2.render,
    placeholder = _ref2.placeholder,
    showPopup = _ref2.showPopup,
    value = _ref2.value,
    format = _ref2.format;
  var label = React.useMemo(function () {
    if (!value) {
      return '';
    }
    return dayjs__default["default"](value).format(format);
  }, [value]);
  return render({
    label: label,
    value: value,
    placeholder: placeholder,
    onClick: showPopup
  });
})(antdTaro.DatePicker);
Picker$1.DatePicker.defaultProps = {
  format: 'YYYY-MM-DD'
};
Picker$1.DatePickerRange = withDecoratorList(function (_ref3) {
  var render = _ref3.render,
    placeholder = _ref3.placeholder,
    showPopup = _ref3.showPopup,
    value = _ref3.value,
    format = _ref3.format;
  var label = React.useMemo(function () {
    if (!value) {
      return '';
    }
    return value.map(function (value) {
      return value === 'sofar' ? '至今' : dayjs__default["default"](value).format(format);
    }).join('~');
  }, [value]);
  return render({
    label: label,
    value: value,
    placeholder: placeholder,
    onClick: showPopup
  });
})(antdTaro.DatePickerRange);
Picker$1.DatePickerRange.defaultProps = {
  format: 'YYYY-MM'
};

var useOnChange$1 = hooks.useOnChange;
var SelectorField = function SelectorField(props) {
  var render = useOnChange$1(props);
  return render(antdTaro.Selector);
};
SelectorField.Item = withItem(SelectorField);
SelectorField.Fetch = withFetchList(antdTaro.Selector);
SelectorField.FetchItem = withItem(SelectorField.Fetch);

var useDecorator$1 = hooks.useDecorator;
var SliderField = function SliderField(props) {
  var render = useDecorator$1(Object.assign({}, props));
  return render(antdTaro.Slider);
};
antdTaro.Slider.Item = withItem(SliderField);

var useOnChange = hooks.useOnChange,
  useCheckedToValue = hooks.useCheckedToValue;
var withChecked = hoc.withChecked;
var WithSwitch = withChecked(antdTaro.Switch);
var Switch$1 = function Switch(props) {
  var checkedProps = useCheckedToValue(props);
  var render = useOnChange(checkedProps);
  return render(WithSwitch);
};
Switch$1.Item = withItem(Switch$1);

var useDecorator = hooks.useDecorator;
var TextAreaField = function TextAreaField(props) {
  var render = useDecorator(Object.assign({
    placeholder: "\u8BF7\u8F93\u5165" + props.label
  }, props));
  return render(antdTaro.TextArea);
};
TextAreaField.Item = withItem(TextAreaField);

var baseUrlPrefix = '';
var baseURL = baseUrlPrefix;
var oldREQ = ReactForm.RULES.REQ;
ReactForm.preset({
  REQ: function REQ() {
    return Object.assign({}, oldREQ.apply(void 0, [].slice.call(arguments)), {
      errMsg: '%s不能为空'
    });
  }
});
var globalParams = {
  rules: {},
  field: {
    imageUploader: {
      upload: function upload(file) {
        return {
          url: URL.createObjectURL(file)
        };
      }
    }
  }
};
var ajax = axios__default["default"].create({
  baseURL: baseURL
});
reactFetch.preset({
  loading: null,
  ajax: ajax,
  transformResponse: function transformResponse(response) {
    var data = response.data;
    response.data = {
      code: data.code === 0 || data.code === 401 ? 200 : data.code,
      msg: data.msg,
      results: data.data
    };
    return response;
  }
});
var preset = (function (props) {
  merge__default["default"](globalParams, props);
  ReactForm.preset(globalParams.rules);
});

var ResetButton = function ResetButton(props) {
  var resetProps = ReactForm.useReset();
  return /*#__PURE__*/React__default["default"].createElement(antdTaro.Button, _extends({}, resetProps, props));
};

var _excluded = ["realTime", "disabled"],
  _excluded2 = ["isPass", "isLoading"];
var SubmitButton = function SubmitButton(_ref) {
  var realTime = _ref.realTime,
    disabled = _ref.disabled,
    props = _objectWithoutPropertiesLoose(_ref, _excluded);
  var _useSubmit = ReactForm.useSubmit(props),
    isPass = _useSubmit.isPass,
    isLoading = _useSubmit.isLoading,
    submitProps = _objectWithoutPropertiesLoose(_useSubmit, _excluded2);
  return /*#__PURE__*/React__default["default"].createElement(antdTaro.Button, _extends({
    loading: isLoading,
    disabled: disabled || (realTime ? !isPass : false)
  }, submitProps, props));
};
SubmitButton.defaultProps = {
  block: true,
  color: 'primary',
  disabled: false
};

var CheckList = CheckListField;
var Input = InputField;
var Picker = Picker$1;
var Selector = SelectorField;
var Slider = antdTaro.Slider;
var Switch = Switch$1;
var TextArea = TextAreaField;
var fields = {
  CheckList: CheckList,
  Input: Input,
  Picker: Picker,
  Selector: Selector,
  Slider: Slider,
  Switch: Switch,
  TextArea: TextArea
};

exports.CheckList = CheckList;
exports.Input = Input;
exports.Picker = Picker;
exports.ResetButton = ResetButton;
exports.Selector = Selector;
exports.Slider = Slider;
exports.SubmitButton = SubmitButton;
exports.Switch = Switch;
exports.TextArea = TextArea;
exports["default"] = Form;
exports.fields = fields;
exports.hooks = hooks;
exports.preset = preset;
exports.utils = utils;
exports.widget = widget;
Object.keys(ReactForm).forEach(function (k) {
  if (k !== 'default' && !exports.hasOwnProperty(k)) Object.defineProperty(exports, k, {
    enumerable: true,
    get: function () { return ReactForm[k]; }
  });
});
//# sourceMappingURL=react-form-antd-taro.js.map
