import { onValue } from 'firebase/database';
import { FunctionComponent, useEffect } from 'react';
import { questionsRef } from '../services/firebaseService';

export const QuestionListPage: FunctionComponent<{}> = () => {
  useEffect(() => {
    const unsubscribe = onValue(questionsRef, (snapshot) => {
      console.log(JSON.stringify(snapshot.val(), null, 2));
    });

    function onUnmount() {
      unsubscribe();
    }

    return onUnmount;
  }, []);

  return <div>QuestionListPage works</div>;
};
