import React, { FunctionComponent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuestionDetails } from '../hooks/useQuestionDetails';
import { child, get, onValue, set } from 'firebase/database';
import { playersRef } from '../services/firebaseService';

type PlayerQuestion = {
  answerStatuses: boolean[];
  errorCount: number;
};

export function playerQuestionDetailsPagePath(
  playerId: string,
  questionId: string
) {
  return `/players/${playerId}/questions/${questionId}`;
}

function playerQuestionRef(playerId: string, questionId: string) {
  return child(playersRef, `${playerId}/${questionId}`);
}

function updatePlayerQuestion(playerId: string, questionId: string) {
  set(playerQuestionRef(playerId, questionId), {
    answerStatuses: [true, true],
    errorCount: 0,
  });
}

function flipAnswerStatus(params: {
  playerId: string;
  questionId: string;
  answerIndex: number;
  currentPlayerQuestion: PlayerQuestion;
}) {
  const { playerId, questionId, answerIndex, currentPlayerQuestion } = params;
  set(playerQuestionRef(playerId, questionId), {
    ...currentPlayerQuestion,
    answerStatuses: currentPlayerQuestion.answerStatuses.map((status, i) => {
      if (i === answerIndex) {
        return !status;
      }
      return status;
    }),
  });
}

export const PlayerQuestionDetailPage: FunctionComponent<{}> = () => {
  const { questionId, playerId } = useParams<{
    playerId: string;
    questionId: string;
  }>();

  const { question } = useQuestionDetails(questionId);

  const [playerQuestion, setPlayerQuestion] = useState<PlayerQuestion | null>(
    null
  );
  useEffect(() => {
    if (!playerId || !questionId) {
      return;
    }
    const unsubscribe = onValue(
      playerQuestionRef(playerId, questionId),
      (snapshot) => {
        setPlayerQuestion(snapshot.val());
      }
    );

    return unsubscribe;
  }, [playerId, questionId]);

  console.log({ playerQuestion });

  function createGame(question: Question) {
    if (!playerId || !questionId) {
      return;
    }
    console.log('creating game');
    const playerQuestion = {
      answerStatuses: question.answers.map(() => false),
      errorCount: 0,
    };
    set(playerQuestionRef(playerId, questionId), playerQuestion);
  }

  // ----------------------------------------
  // render
  // ----------------------------------------
  if (!playerId || !questionId || !question) {
    return <>Not found</>;
  }

  return (
    <div>
      <div>PlayerQuestionDetailPage works</div>
      {!playerQuestion && (
        <div>
          <button onClick={() => createGame(question)}>Create game</button>
        </div>
      )}
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
