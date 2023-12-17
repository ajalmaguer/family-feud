import { FunctionComponent, ReactNode } from 'react';

type ButtonStyles =
  | ''
  | 'btn-neutral'
  | 'btn-primary'
  | 'btn-secondary'
  | 'btn-accent'
  | 'btn-ghost'
  | 'btn-link'
  | 'btn-info'
  | 'btn-success'
  | 'btn-warning'
  | 'btn-error';

export const Button: FunctionComponent<{
  style?: ButtonStyles;
  children: ReactNode;
  className?: string;
  type?: 'button' | 'submit';
  onClick?: () => void;
  outline?: boolean;
}> = ({
  style = '',
  children,
  className = '',
  type,
  onClick = () => {},
  outline,
}) => {
  return (
    <button
      className={['btn', style, className, outline && 'btn-outline'].join(' ')}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
