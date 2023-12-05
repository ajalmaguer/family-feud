import { child, onValue } from 'firebase/database';
import { FunctionComponent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { questionsRef } from '../services/firebaseService';

export function questionDetailPagePath(id: string) {
  return `/questions/${id}`;
}

export const QuestionDetailPage: FunctionComponent<{}> = () => {
  const { id } = useParams<{ id: string }>();
  const [question, setQuestion] = useState<Question>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) {
      return;
    }
    setLoading(true);

    const unsubscribe = onValue(child(questionsRef, id), (snapshot) => {
      setQuestion(snapshot.val());
      setLoading(false);
    });

    function onUnmount() {
      unsubscribe();
    }

    return onUnmount;
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!question) {
    return <div>Question not found</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold underline">{question.text}</h1>
      <ul>
        {question.answers.map((answer, i) => (
          <li
            key={
              i
              // answer.id
            }
          >
            {answer.text} - {answer.points}
          </li>
        ))}
      </ul>
    </div>
  );
};
