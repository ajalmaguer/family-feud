import { child, onValue, set } from 'firebase/database';
import { useEffect, useState } from 'react';
import { playersRef } from '../services/firebaseService';

export type Player = {
  currentQuestion: string;
  questions: Record<string, PlayerQuestion>;
};

export type PlayerQuestion = {
  answerStatuses: boolean[];
  errorCount: number;
};

function playerRef(playerId: string) {
  return child(playersRef, `${playerId}`);
}

function playerQuestionsRef(playerId: string, questionId: string) {
  return child(playersRef, `${playerId}/questions`);
}

function playerQuestionRef(playerId: string, questionId: string) {
  return child(playersRef, `${playerId}/questions/${questionId}`);
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

function playerCurrentQuestionRef(playerId: string) {
  return child(playersRef, `${playerId}/currentQuestion`);
}

export function setCurrentGame(params: {
  playerId: string;
  questionId: string;
}) {
  const { playerId, questionId } = params;
  set(playerCurrentQuestionRef(playerId), questionId);
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

export function usePlayer(params: { playerId: string | undefined | null }) {
  const { playerId } = params;
  const [player, setPlayer] = useState<Player | null>(null);

  useEffect(() => {
    if (!playerId) {
      return;
    }
    const unsubscribe = onValue(playerRef(playerId), (snapshot) => {
      setPlayer(snapshot.val());
    });

    return unsubscribe;
  }, [playerId]);

  return { player };
}
