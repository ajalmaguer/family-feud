import { child, onValue, set } from 'firebase/database';
import { useEffect, useState } from 'react';
import { playersRef } from '../services/firebaseService';

export type PlayerQuestion = {
  answerStatuses: boolean[];
  errorCount: number;
};

function playerQuestionRef(playerId: string, questionId: string) {
  return child(playersRef, `${playerId}/${questionId}`);
}

export function createGame(params: {
  question: Question;
  playerId: string;
  questionId: string;
}) {
  const { question, playerId, questionId } = params;
  const playerQuestion = {
    answerStatuses: question.answers.map(() => false),
    errorCount: 0,
  };
  set(playerQuestionRef(playerId, questionId), playerQuestion);
}

export function flipAnswerStatus(params: {
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

export function usePlayerQuestion(params: {
  playerId: string | undefined | null;
  questionId: string | undefined | null;
}) {
  const { playerId, questionId } = params;
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
  return { playerQuestion };
}
