import { child, onValue, push, update, remove } from 'firebase/database';
import { questionsRef } from './firebaseService';

export type FormValues = {
  question: string;
  answers: {
    text: string;
    points: number;
  }[];
};

export function getQuestionList(callback: (questions: Question[]) => void) {
  return onValue(questionsRef, (snapshot) => {
    const questions = Object.entries(snapshot.val()).map(([key, value]) => {
      return {
        ...(value as { text: string; answers: Answer[] }),
        id: key,
      };
    });
    callback(questions);
  });
}

export function getQuestion(
  id: string,
  callback: (question: Question) => void
) {
  return onValue(child(questionsRef, id), (snapshot) => {
    callback(snapshot.val());
  });
}

export function addQuestion(question: FormValues) {
  const res = push(questionsRef, { text: question.question });
  if (!res.key) {
    return;
  }

  return updateQuestion(res.key, question);
}

export function updateQuestion(questionKey: string, question: FormValues) {
  return update(child(questionsRef, questionKey), {
    answers: question.answers.map(({ text, points }) => ({
      text,
      points: Number(points),
    })),
  });
}

export function deleteQuestion(questionKey: string) {
  return remove(child(questionsRef, questionKey));
}
