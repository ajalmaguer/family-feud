import { FunctionComponent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuestionDetails } from '../hooks/useQuestionDetails';
import { playerQuestionDetailsPagePath } from './PlayerQuestionDetailPage';
import { PlayerIdService } from '../services/playerIdService';
import { createGame, setCurrentGame } from './usePlayerQuestion';
import { Button } from '../component-library/Button';
import { Modal, useModal } from '../component-library/Modal';
import { FormValues, QuestionForm } from '../components/QuestionForm';

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
      <Button style="btn-secondary" onClick={editModal.open}>
        Edit
      </Button>
      <Modal modalRef={editModal.ref}>
        <h2>Edit question</h2>
        <QuestionForm
          onSubmit={handleEdit}
          initialValues={{
            question: question.text,
            answers: question.answers,
          }}
        />
      </Modal>
    </div>
  );
};
