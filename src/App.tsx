type Question = {
  text: string;
  answers: Answer[];
};

type Answer = {
  text: string;
  points: number;
  revealed: boolean;
};

const question: Question = {
  text: 'What is the answer to life, the universe, and everything?',
  answers: [
    { text: 'A', points: 42, revealed: false },
    { text: 'B', points: 34, revealed: false },
  ],
};

export default function App() {
  return (
    <div>
      <h1 className="text-3xl font-bold underline">{question.text}</h1>
      <ul>
        {question.answers.map((question) => (
          <li>
            {question.text} - {question.points}
          </li>
        ))}
      </ul>
    </div>
  );
}
