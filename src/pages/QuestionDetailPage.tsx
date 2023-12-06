import { FunctionComponent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuestionDetails } from '../hooks/useQuestionDetails';
import { playerQuestionDetailsPagePath } from './PlayerQuestionDetailPage';
import { PlayerIdService } from './playerIdService';

export function questionDetailPagePath(id: string) {
  return `/questions/${id}`;
}

export const QuestionDetailPage: FunctionComponent<{}> = () => {
  const { id } = useParams<{ id: string }>();

  const { question, loading } = useQuestionDetails(id);

  const navigate = useNavigate();
  function playGame() {
    let playerId = PlayerIdService.getPlayerId();

    if (!id) {
      return;
    }

    navigate(playerQuestionDetailsPagePath(playerId, id));
  }

  // ----------------------------------------
  // render
  // ----------------------------------------
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
          <li key={i}>
            {answer.text} - {answer.points}
          </li>
        ))}
      </ul>
      <button onClick={playGame}>Play this question</button>
    </div>
  );
};
