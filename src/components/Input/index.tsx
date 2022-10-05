import React from 'react';
import classNames from 'classnames';
import { Field } from 'formik';
import Text from '../Text';

interface IInput {
  id: string;
  name: string;
  as: string;
  type?: 'password' | 'e-mail';
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  msg?: string;
  isInvalid?: boolean;
  children?: React.ReactNode;
  cy: string;
}

const Input = ({
  id,
  name,
  as,
  type,
  label,
  placeholder,
  disabled,
  className,
  msg,
  isInvalid,
  children,
  cy,
}: IInput): React.ReactElement => (
  <label htmlFor={id} className="w-100">
    {label}
    <Field
      cy={cy}
      id={id}
      as={as}
      name={name}
      type={type || 'text'}
      placeholder={placeholder}
      disabled={disabled}
      className={classNames(`form-control ${isInvalid ? 'is-invalid' : ''} ${className}`)}
    >
      {children}
    </Field>
    {isInvalid ? (
      <Text as="span" color="var(--red-500)" weight={500}>
        {msg}
      </Text>
    ) : null}
  </label>
);

Input.defaultProps = { isInvalid: false, msg: '', className: '', label: '', placeholder: '' };

export default Input;
