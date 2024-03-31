import { FunctionComponent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../component-library/Button';
import { useModal } from '../component-library/Modal';
import { NewQuestionModal } from '../components/NewQuestionModal';
import { PlayerIdService } from '../services/playerIdService';
import { getQuestionList } from '../services/questionService';
import { questionDetailPagePath } from './QuestionDetailPage';
import { usePlayer } from './usePlayerQuestion';

export function questionListPagePath() {
  return `/questions`;
}

export const QuestionListPage: FunctionComponent<{}> = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const newQuestionModal = useModal();
  const { player } = usePlayer({ playerId: PlayerIdService.getPlayerId() });

  useEffect(() => {
    const unsubscribe = getQuestionList((questions) => {
      setQuestions(questions);
    });

    function onUnmount() {
      unsubscribe();
    }

    return onUnmount;
  }, []);

  return (
    <div className="p-4 max-w-5xl">
      <div className="mb-8 flex justify-end">
        <Button onClick={newQuestionModal.open}>Add question</Button>
      </div>
      <NewQuestionModal
        isOpen={newQuestionModal.isOpen}
        onClose={newQuestionModal.close}
      />
      <ul>
        {questions.map((question) => (
          <li key={question.id}>
            <Link
              to={questionDetailPagePath(question.id)}
              className="mb-4 border border-gray-500 rounded p-4 flex justify-between"
            >
              {question.text}
              {player && player.questions[question.id] && (
                <div className="text-green-600 italic">Played</div>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
