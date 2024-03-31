import { FunctionComponent, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuestionDetails } from '../../hooks/useQuestionDetails';
import { calculateEarnedPoints } from '../../utils/calculateEarnedPoints';
import { usePlayer } from '../usePlayerQuestion';
import { AnswerTile } from './AnswerTile';

export function boardPagePath(playerId: string) {
  return `/board?p=${playerId}`;
}

export const BoardPage: FunctionComponent<{}> = () => {
  useEffect(() => {
    document.title = 'Family Feud | Board';
  }, []);

  const [searchParams] = useSearchParams();
  const playerId = searchParams.get('p');

  const { player } = usePlayer({ playerId });

  const questionId = player?.currentQuestion;
  const { question } = useQuestionDetails(questionId);
  const playerQuestion = player && player.questions[questionId || ''];
  const errorArray = Array.from({ length: playerQuestion?.errorCount || 0 });

  if (!question || !playerQuestion) {
    return <div>not found</div>;
  }

  const earnedPointes = calculateEarnedPoints(question, playerQuestion);

  // make an array of nulls called emptyAnswers. There should be 8-answers.length nulls in the array
  const emptyTiles = Array.from({ length: 8 - question.answers.length });

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="space-y-4">
        <div className="flex justify-center mb-4">
          <div className="p-4 w-fit border border-blue-400 rounded text-xl">
            {earnedPointes}
          </div>
        </div>

        <ul
          className={[
            'flex flex-col',
            'gap-4',
            'md:grid md:grid-rows-4 md:grid-cols-1 md:grid-flow-col',
          ].join(' ')}
        >
          {question.answers.map((answer, i) => {
            const answerStatuses = playerQuestion?.answerStatuses;
            const answerStatus = answerStatuses && answerStatuses[i];
            return (
              <AnswerTile
                key={i}
                flipped={answerStatus}
                back={
                  <div className="flex justify-between">
                    <div>{answer.text}</div>
                    <div>{answer.points}</div>
                  </div>
                }
                front={<div className="text-center">{i + 1}</div>}
              ></AnswerTile>
            );
          })}
          {emptyTiles.map((_, i) => (
            <AnswerTile key={i} empty></AnswerTile>
          ))}
        </ul>

        <div className="flex justify-center">
          <ul className="flex flex-row gap-4 min-h-4">
            {errorArray.length === 0 ? (
              <li className="w-4 h-4 rounded-full"></li>
            ) : (
              errorArray.map((_, i) => (
                <li key={i} className="w-4 h-4 bg-red-600 rounded-full"></li>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};
