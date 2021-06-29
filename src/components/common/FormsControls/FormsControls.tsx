import React from 'react';
import { Field, WrappedFieldProps } from 'redux-form';
import styles from './FormControls.module.css';
import { FieldValidatorType } from '../../../utils/validators/validators';

// Types
type FormControlPropsTypes = {
  touched: boolean;
  error?: any;
  element: React.ReactNode;
};
type FormAdditionalTypes = {
  placeholder: string | undefined;
  type: 'password' | 'checkbox';
};
export type GetStringKeys<T> = Extract<keyof T, string>;

const FormControl: React.FC<FormControlPropsTypes> = ({ element, touched, error }) => {
  const hasError = touched && error;
  return (
    <div className={hasError ? styles.error : ''}>
      {element}
      {hasError && <div>{error}</div>}
    </div>
  );
};

export const Textarea: React.FC<WrappedFieldProps & FormAdditionalTypes> = ({ input, meta, placeholder, type }) => {
  const element = React.createElement('textarea', { ...input, placeholder, type });
  return <FormControl {...meta} element={element} />;
};
export const Input: React.FC<WrappedFieldProps & FormAdditionalTypes> = ({ input, meta, placeholder, type }) => {
  const element = React.createElement('input', { ...input, placeholder, type });
  return <FormControl {...meta} element={element} />;
};

// в FormKeysType могут попасть только определенные типы только строк
export function CreateField<FormKeysType extends string>(
  placeholder: string | undefined,
  name: FormKeysType,
  validators: Array<FieldValidatorType>,
  component: React.FC<WrappedFieldProps & FormAdditionalTypes>,
  // сложная типизации component, прокидываю вручную тип для placeholder и type, потому что это мной выдуманные пропсы а не стандарнтные
  props = { type: 'text' },
  additionalText?: string,
  className?: string
) {
  return (
    <div className={className}>
      <Field name={name} placeholder={placeholder} component={component} validate={validators} {...props} />
      {additionalText && <span>{additionalText}</span>}
    </div>
  );
}
