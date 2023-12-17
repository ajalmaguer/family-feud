import { FunctionComponent, ReactNode } from 'react';

type ButtonStyles =
  | 'btn-neutral'
  | 'btn-primary'
  | 'btn-secondary'
  | 'btn-accent'
  | 'btn-ghost'
  | 'btn-link';

export const Button: FunctionComponent<{
  style?: ButtonStyles;
  children: ReactNode;
  className?: string;
  type?: 'button' | 'submit';
  onClick?: () => void;
}> = ({
  style = 'btn-primary',
  children,
  className = '',
  type,
  onClick = () => {},
}) => {
  return (
    <button
      className={['btn', style, className].join(' ')}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
