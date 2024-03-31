import { FunctionComponent, ReactNode } from 'react';
import styles from './AnswerTile.module.css';

export const AnswerTile: FunctionComponent<{
  front?: ReactNode;
  back?: ReactNode;
  empty?: boolean;
  flipped?: boolean;
}> = ({ front, back, flipped }) => {
  return (
    <li
      className={[styles['flip-card'], flipped && styles['flipped']].join(' ')}
    >
      <div className={styles['flip-card-inner']}>
        <div className={styles['flip-card-front']}>
          <div className="w-full">{front}</div>
        </div>
        <div className={styles['flip-card-back']}>
          <div className="w-full">{back}</div>
        </div>
      </div>
    </li>
  );
};
