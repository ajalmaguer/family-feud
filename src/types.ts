type Question = {
  text: string;
  answers: Answer[];
};

type Answer = {
  text: string;
  points: number;
  revealed: boolean;
};
