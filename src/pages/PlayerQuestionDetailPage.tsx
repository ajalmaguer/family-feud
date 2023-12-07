import React, { FunctionComponent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuestionDetails } from '../hooks/useQuestionDetails';
import { child, get, onValue, set } from 'firebase/database';
import { playersRef } from '../services/firebaseService';

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

export const PlayerQuestionDetailPage: FunctionComponent<{}> = () => {
  const { questionId, playerId } = useParams<{
    playerId: string;
    questionId: string;
  }>();

  const { question } = useQuestionDetails(questionId);

  const [playerQuestion, setPlayerQuestion] = useState();
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

  // ----------------------------------------
  // render
  // ----------------------------------------
  if (!playerId || !questionId || !question) {
    return <>Not found</>;
  }

  return (
    <div>
      PlayerQuestionDetailPage works
      <button onClick={() => updatePlayerQuestion(playerId, questionId)}>
        do the thing
      </button>
      <div>{question.text}</div>
      <ul>
        {question.answers.map((answer, i) => (
          <li key={i}>
            {answer.text} - {answer.points}
          </li>
        ))}
      </ul>
    </div>
  );
};
