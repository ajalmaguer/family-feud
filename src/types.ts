type Question = {
  id: string;
  text: string;
  answers: Answer[];
};

type Answer = {
  text: string;
  points: number;
  // revealed: boolean;
};
