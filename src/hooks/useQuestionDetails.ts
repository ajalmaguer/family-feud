import { onValue, child } from 'firebase/database';
import { useState, useEffect } from 'react';
import { questionsRef } from '../services/firebaseService';

export function useQuestionDetails(id: string | undefined | null) {
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

  return { question, loading };
}
