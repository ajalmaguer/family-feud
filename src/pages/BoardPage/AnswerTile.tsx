import { FunctionComponent, ReactNode } from 'react';

export const AnswerTile: FunctionComponent<{
  className?: string;
  children?: ReactNode;
  empty?: boolean;
}> = ({ className = '', children, empty }) => {
  return (
    <li
      className={[
        'border border-blue-400 rounded',
        'p-2 min-w-[300px]',
        empty && 'h-12',
        className,
      ].join(' ')}
    >
      {children}
    </li>
  );
};
