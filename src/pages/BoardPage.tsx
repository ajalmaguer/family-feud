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

  if (!question || !playerQuestion) {
    return <div>not found</div>;
  }

  const earnedPointes = question.answers.reduce((acc, answer, i) => {
    if (!playerQuestion.answerStatuses[i]) {
      return acc;
    }
    return acc + answer.points;
  }, 0);

  return (
    <div>
      <ul>
        {question.answers.map((answer, i) => {
          const answerStatuses = playerQuestion?.answerStatuses;
          const answerStatus = answerStatuses && answerStatuses[i];
          return (
            <li key={i}>
              {answerStatus ? (
                <>
                  {answer.text} | {answer.points}
                </>
              ) : (
                <>hidden</>
              )}
            </li>
          );
        })}
      </ul>
      <div>earned points: {earnedPointes}</div>
    </div>
  );
};
