import { FunctionComponent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useModal } from '../component-library/Modal';
import { NewQuestionModal } from '../components/NewQuestionModal';
import { getQuestionList } from '../services/questionService';
import { questionDetailPagePath } from './QuestionDetailPage';
import { Button } from '../component-library/Button';

export function questionListPagePath() {
  return `/questions`;
}

export const QuestionListPage: FunctionComponent<{}> = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const newQuestionModal = useModal();

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
    <div className="p-4">
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
              className="mb-4 border border-gray-500 rounded p-4 block"
            >
              {question.text}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
