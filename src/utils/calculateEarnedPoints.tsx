import { PlayerQuestion } from '../pages/usePlayerQuestion';

export function calculateEarnedPoints(
  question: Question,
  playerQuestion: PlayerQuestion
) {
  return question.answers.reduce((acc, answer, i) => {
    if (!playerQuestion.answerStatuses[i]) {
      return acc;
    }
    return acc + answer.points;
  }, 0);
}
