import { FunctionComponent } from 'react';
import { Link, Outlet, useNavigate, useParams } from 'react-router-dom';
import { Button } from '../component-library/Button';
import { Modal, useModal } from '../component-library/Modal';
import { FormValues, QuestionForm } from '../components/QuestionForm';
import { useQuestionDetails } from '../hooks/useQuestionDetails';
import { PlayerIdService } from '../services/playerIdService';
import { playerQuestionDetailsPagePath } from './PlayerQuestionDetailPage';
import { createGame, setCurrentGame } from './usePlayerQuestion';

export function questionDetailPagePath(id: string) {
  return `/questions/${id}`;
}

export const QuestionDetailPage: FunctionComponent<{}> = () => {
  const { id } = useParams<{ id: string }>();
  const editModal = useModal();

  const { question, loading } = useQuestionDetails(id);

  function handleEdit(data: FormValues) {
    console.log('edit > data =', data);
  }

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
      <Button style="btn-primary" onClick={playGame}>
        Play this question
      </Button>
      <Link to="edit" relative='path'>
        <Button style="btn-secondary">Edit</Button>
      </Link>
      <Outlet />
    </div>
  );
};
