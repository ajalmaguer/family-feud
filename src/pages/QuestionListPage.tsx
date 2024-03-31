import { onValue } from 'firebase/database';
import { FunctionComponent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useModal } from '../component-library/Modal';
import { questionsRef } from '../services/firebaseService';
import { questionDetailPagePath } from './QuestionDetailPage';
import { NewQuestionModal } from '../components/NewQuestionModal';

export function questionListPagePath() {
  return `/questions`;
}

export const QuestionListPage: FunctionComponent<{}> = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const newQuestionModal = useModal();

  useEffect(() => {
    const unsubscribe = onValue(questionsRef, (snapshot) => {
      const questions = Object.entries(snapshot.val()).map(([key, value]) => {
        return {
          ...(value as { text: string; answers: Answer[] }),
          id: key,
        };
      });
      setQuestions(questions);
    });

    function onUnmount() {
      unsubscribe();
    }

    return onUnmount;
  }, []);

  return (
    <div className="px-4">
      <div className="mb-8">
        <button onClick={newQuestionModal.open}>Add question</button>
        <NewQuestionModal
          isOpen={newQuestionModal.isOpen}
          onClose={newQuestionModal.close}
        />
      </div>
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
