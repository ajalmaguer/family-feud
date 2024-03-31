import { FunctionComponent } from 'react';
import { Link, Outlet, useNavigate, useParams } from 'react-router-dom';
import { Button } from '../component-library/Button';
import { useQuestionDetails } from '../hooks/useQuestionDetails';
import { PlayerIdService } from '../services/playerIdService';
import { playerQuestionDetailsPagePath } from './PlayerQuestionDetailPage';
import { createGame, setCurrentGame, usePlayer } from './usePlayerQuestion';
import { deleteQuestion } from '../services/questionService';

export function questionDetailPagePath(id: string) {
  return `/questions/${id}`;
}

export const QuestionDetailPage: FunctionComponent<{}> = () => {
  const { id } = useParams<{ id: string }>();
  const { question, loading } = useQuestionDetails(id);
  const { player } = usePlayer({ playerId: PlayerIdService.getPlayerId() });

  const navigate = useNavigate();

  function playGame() {
    let playerId = PlayerIdService.getPlayerId();

    if (!id || !question) {
      return;
    }

    createGame({
      question,
      playerId,
      questionId: id,
    });

    setCurrentGame({ playerId, questionId: id });

    navigate(playerQuestionDetailsPagePath(playerId, id));
  }

  // ----------------------------------------
  // render
  // ----------------------------------------
  if (loading) {
    return <div>Loading...</div>;
  }

  if (!question || !id) {
    return <div>Question not found</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold underline">{question.text}</h1>
      {player?.questions[id] && (
        <div className="text-green-600 italic">Played</div>
      )}
      <ul>
        {question.answers.map((answer, i) => (
          <li key={i}>
            {answer.text} - {answer.points}
          </li>
        ))}
      </ul>
      <div className="flex justify-between">
        <div className="flex gap-2">
          <Button style="btn-primary" onClick={playGame}>
            Play this question
          </Button>
          <Link to="edit" relative="path">
            <Button style="btn-secondary">Edit</Button>
          </Link>
        </div>
        <div>
          <Button
            style="btn-error"
            onClick={() => {
              if (
                confirm('Are you sure you want to delete this question?') ===
                false
              ) {
                return;
              }
              deleteQuestion(id);
              navigate('/questions');
            }}
          >
            Delete
          </Button>
        </div>
      </div>

      <Outlet />
    </div>
  );
};
