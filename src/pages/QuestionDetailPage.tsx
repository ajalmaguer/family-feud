import { FunctionComponent, useEffect } from 'react';
import { foobar, questionsRef } from '../services/firebaseService';
import { child, onValue } from 'firebase/database';
import { useParams } from 'react-router-dom';

const question: Question = {
  text: 'What is the answer to life, the universe, and everything?',
  answers: [
    { text: 'A', points: 42, revealed: false },
    { text: 'B', points: 34, revealed: false },
  ],
};

export const QuestionDetailPage: FunctionComponent<{}> = () => {
  const { id } = useParams<{ id: string }>();
  useEffect(() => {
    if (!id) {
      console.log('do nothing');
      return;
    }
    console.log('onMount');

    const unsubscribe = onValue(child(questionsRef, id), (snapshot) => {
      console.log('things changed | snapshot.val()', snapshot.val());
      console.log(JSON.stringify(snapshot.val(), null, 2));
    });

    function onUnmount() {
      console.log('on unMount');
      unsubscribe();
    }

    return onUnmount;
  }, [id]);

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

const blah = {
  '-MQiUSY-uKFItfxdkAti': {
    answers: [
      {
        points: 45,
        text: 'Cereal',
      },
      {
        points: 21,
        text: 'Oatmeal',
      },
      {
        points: 12,
        text: 'Pancakes',
      },
      {
        points: 7,
        text: 'Eggs',
      },
      {
        points: 5,
        text: 'Toast',
      },
      {
        points: 3,
        text: 'Bagel',
      },
      {
        points: 3,
        text: 'Yogurt',
      },
      {
        points: 2,
        text: 'Bacon',
      },
    ],
    question: "Name something you'd only eat for breakfast",
  },
  '-MQiUstBzQpGgzZdEiqp': {
    answers: [
      {
        points: 20,
        text: 'America/ USA',
      },
      {
        points: 16,
        text: 'Australia',
      },
      {
        points: 13,
        text: 'Canada',
      },
      {
        points: 8,
        text: 'Africa',
      },
      {
        points: 6,
        text: 'Argentina',
      },
      {
        points: 5,
        text: 'Russia',
      },
      {
        points: 4,
        text: 'Albania',
      },
      {
        points: 4,
        text: 'China',
      },
    ],
    question: 'Name a country ending in the letter "A"',
  },
  '-MQkY4xFw8ISqWSwcCFG': {
    answers: [
      {
        points: 25,
        text: 'Candlestick',
      },
      {
        points: 19,
        text: 'Knife',
      },
      {
        points: 11,
        text: 'Gun',
      },
      {
        points: 9,
        text: 'Rope',
      },
      {
        points: 6,
        text: 'Sword',
      },
    ],
    question: 'Name one of the weapons from the game clue',
  },
  '-MQkYlm8pHui-F6PNza1': {
    answers: [
      {
        points: 37,
        text: 'Sandwich',
      },
      {
        points: 22,
        text: 'Apple ',
      },
      {
        points: 19,
        text: 'Juice Box/ Juice',
      },
      {
        points: 6,
        text: 'Thermos',
      },
      {
        points: 5,
        text: 'Cookies',
      },
      {
        points: 5,
        text: 'Fruit',
      },
      {
        points: 4,
        text: 'Chips',
      },
    ],
    question: "Name something you might find in a school kid's lunch box",
  },
};
