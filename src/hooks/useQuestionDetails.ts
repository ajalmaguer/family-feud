import { useEffect, useState } from 'react';
import { getQuestion } from '../services/questionService';

export function useQuestionDetails(id: string | undefined | null) {
  const [question, setQuestion] = useState<Question>();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (!id) {
      return;
    }
    setLoading(true);

    const unsubscribe = getQuestion(id, (question) => {
      setQuestion(question);
      setLoading(false);
    });

    function onUnmount() {
      unsubscribe();
    }

    return onUnmount;
  }, [id]);

  return { question, loading };
}
