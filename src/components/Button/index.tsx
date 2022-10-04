import React from 'react';
import { Button as ButtonRoot, ButtonProps } from 'react-bootstrap';
import './styles.scss';

interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement>, ButtonProps {
  cy?: string;
  children?: React.ReactNode | React.ReactNode[];
}

const Button = ({ children, cy, ...props }: IButton): React.ReactElement => (
  <ButtonRoot data-cy={cy} {...props}>
    {children}
  </ButtonRoot>
);

export default Button;
