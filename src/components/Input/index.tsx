import React from 'react';
import classNames from 'classnames';
import { Field } from 'formik';
import Text from '../Text';

interface IInput {
  cy: string;
  isInvalid?: boolean;
  msg?: string;
  className?: string;
  label?: string;
  id: string;
  name: string;
  as: string;
  placeholder?: string;
  disabled?: boolean;
  type?: 'password' | 'e-mail';
}

const Input = ({
  cy,
  isInvalid,
  msg,
  className,
  label,
  id,
  name,
  as,
  placeholder,
  disabled,
  type,
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
    />
    {isInvalid ? (
      <Text as="span" color="var(--red-500)" weight={500}>
        {msg}
      </Text>
    ) : null}
  </label>
);

Input.defaultProps = { isInvalid: false, msg: '', className: '', label: '', placeholder: '' };

export default Input;
