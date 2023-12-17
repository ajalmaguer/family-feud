import { FunctionComponent } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuestionDetails } from '../hooks/useQuestionDetails';
import {
  flipAnswerStatus,
  setCurrentGame,
  usePlayerQuestion,
} from './usePlayerQuestion';
import { boardPagePath } from './BoardPage/BoardPage';
import { calculateEarnedPoints } from '../utils/calculateEarnedPoints';
import { Button } from '../component-library/Button';

export function playerQuestionDetailsPagePath(
  playerId: string,
  questionId: string
) {
  return `/players/${playerId}/questions/${questionId}`;
}

export const PlayerQuestionDetailPage: FunctionComponent<{}> = () => {
  const { questionId, playerId } = useParams<{
    playerId: string;
    questionId: string;
  }>();

  const { question } = useQuestionDetails(questionId);
  const { playerQuestion } = usePlayerQuestion({ playerId, questionId });

  // ----------------------------------------
  // render
  // ----------------------------------------
  if (!playerId || !questionId || !question) {
    return <>Not found</>;
  }

  return (
    <div>
      <div>PlayerQuestionDetailPage works</div>
      <div>{question.text}</div>
      <div>Error count: {playerQuestion?.errorCount}</div>
      <div>
        Earned points:{' '}
        {playerQuestion ? calculateEarnedPoints(question, playerQuestion) : 0}
      </div>
      <div>
        <Link
          target="_blank"
          rel="noreferrer"
          to={boardPagePath(playerId, questionId)}
          className="btn"
        >
          Open board
        </Link>
        <Button
          onClick={() => setCurrentGame({ playerId, questionId })}
          style="btn-primary"
        >
          Send to board
        </Button>
      </div>
      <ul>
        {question.answers.map((answer, i) => {
          const answerStatuses = playerQuestion?.answerStatuses;
          const answerStatus = answerStatuses && answerStatuses[i];
          return (
            <li
              key={i}
              className={[
                'border border-red-500 w-[300px] p-2 flex justify-between',
                answerStatus && 'bg-green-500',
              ].join(' ')}
            >
              {answer.text} - {answer.points}{' '}
              {playerQuestion && (
                <button
                  onClick={() =>
                    flipAnswerStatus({
                      playerId,
                      questionId,
                      answerIndex: i,
                      currentPlayerQuestion: playerQuestion,
                    })
                  }
                >
                  {answerStatus ? 'hide' : 'flip'}
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
