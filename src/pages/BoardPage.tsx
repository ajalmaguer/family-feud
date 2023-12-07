import { FunctionComponent } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuestionDetails } from '../hooks/useQuestionDetails';
import { usePlayerQuestion } from './usePlayerQuestion';

export function boardPagePath(playerId: string, questionId: string) {
  return `/board?p=${playerId}&q=${questionId}`;
}

export const BoardPage: FunctionComponent<{}> = () => {
  const [searchParams] = useSearchParams();
  const playerId = searchParams.get('p');
  const questionId = searchParams.get('q');

  const { question } = useQuestionDetails(questionId);
  const { playerQuestion } = usePlayerQuestion({ playerId, questionId });

  console.log(JSON.stringify({ question, playerQuestion }, null, 2));

  return <div>BoardPage works</div>;
};
