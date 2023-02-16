import useBlurDecorator from './hooks/useBlurDecorator';
import useChangeDecorator from './hooks/useChangeDecorator';
import useCheckedToValue, { withChecked } from './hooks/useCheckedToValue';
import useDecorator, { useOnBlur, useOnChange } from './hooks/useDecorator';
import useUIDecorator from './hooks/useUIDecorator';
import useFieldProps from './hooks/useFieldProps';
import { useField } from '@kne/react-form';

export const hooks = {
  useField,
  useFieldProps,
  useBlurDecorator,
  useChangeDecorator,
  useCheckedToValue,
  useDecorator,
  useOnBlur,
  useOnChange,
  useUIDecorator
};

export const hoc = {
  withChecked
};

export const widget = {};

export const utils = {};

const api = {
  hooks,
  hoc,
  widget,
  utils
};

export { default as preset } from './preset';

export default api;
