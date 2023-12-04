import { FunctionComponent } from 'react';

const question: Question = {
  text: 'What is the answer to life, the universe, and everything?',
  answers: [
    { text: 'A', points: 42, revealed: false },
    { text: 'B', points: 34, revealed: false },
  ],
};

export const QuestionDetailPage: FunctionComponent<{}> = () => {
  return <div>QuestionDetailPage works</div>;
};
