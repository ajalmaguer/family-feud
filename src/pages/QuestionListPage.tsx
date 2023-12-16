import { onValue } from 'firebase/database';
import { FunctionComponent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { questionsRef } from '../services/firebaseService';
import { questionDetailPagePath } from './QuestionDetailPage';
import { Modal, useModal } from '../components/Modal';
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
    <div>
      <div>
        <button onClick={newQuestionModal.open}>Add question</button>
        <NewQuestionModal modalRef={newQuestionModal.ref} />
      </div>
      <ul>
        {questions.map((question) => (
          <li key={question.id}>
            <Link to={questionDetailPagePath(question.id)}>
              {question.text}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
