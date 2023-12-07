import { FunctionComponent } from 'react';
import { useParams } from 'react-router-dom';
import { useQuestionDetails } from '../hooks/useQuestionDetails';
import { flipAnswerStatus, usePlayerQuestion } from './usePlayerQuestion';

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
      <ul>
        {question.answers.map((answer, i) => {
          const answerStatuses = playerQuestion?.answerStatuses;
          const answerStatus = answerStatuses && answerStatuses[i];
          return (
            <li key={i}>
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
