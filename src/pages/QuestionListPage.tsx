import { get, onValue } from 'firebase/database';
import { FunctionComponent, useEffect } from 'react';
import { questionsRef } from '../services/firebaseService';

export const QuestionListPage: FunctionComponent<{}> = () => {
  useEffect(() => {
    console.log('onMount');

    const unsubscribe = onValue(questionsRef, (snapshot) => {
      console.log('things changed | snapshot.val()', snapshot.val());
      console.log(JSON.stringify(snapshot.val(), null, 2));
    });

    function onUnmount() {
      console.log('on unMount');
      unsubscribe();
    }

    return onUnmount;
  }, []);

  return <div>QuestionListPage works</div>;
};
