import { FunctionComponent } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuestionDetails } from '../hooks/useQuestionDetails';
import { calculateEarnedPoints } from '../utils/calculateEarnedPoints';
import { boardPagePath } from './BoardPage/BoardPage';
import {
  flipAnswerStatus,
  setErrorCount,
  usePlayerQuestion,
} from './usePlayerQuestion';
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
  const errorCount = playerQuestion?.errorCount || 0;

  // ----------------------------------------
  // render
  // ----------------------------------------
  if (!playerId || !questionId || !question) {
    return <>Not found</>;
  }

  const handleMinusError = () => {
    if (errorCount === 0) {
      return;
    }

    setErrorCount({
      playerId,
      questionId,
      errorCount: errorCount - 1,
    });
  };

  const handlePlusError = () => {
    setErrorCount({ playerId, questionId, errorCount: errorCount + 1 });
  };

  return (
    <div className="p-4">
      <div className="font-bold text-xl">{question.text}</div>
      {/* <div>Error count: {playerQuestion?.errorCount}</div> */}
      <div>
        Earned points:{' '}
        {playerQuestion ? calculateEarnedPoints(question, playerQuestion) : 0}
      </div>

      <ul className="flex flex-col gap-y-8 mb-8">
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

      <div>errorCount = {errorCount}</div>
      <div className="flex justify-between mb-8">
        <Button onClick={handleMinusError}>- error</Button>
        <Button onClick={handlePlusError}>+ error</Button>
      </div>
      <div>
        <Link
          target="_blank"
          rel="noreferrer"
          to={boardPagePath(playerId)}
          className="btn"
        >
          Open board
        </Link>
      </div>
    </div>
  );
};
