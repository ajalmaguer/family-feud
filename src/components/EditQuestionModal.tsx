import { child, push, update } from 'firebase/database';
import { FunctionComponent, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Modal, useModal } from '../component-library/Modal';
import { FormValues, QuestionForm } from '../components/QuestionForm';
import { useQuestionDetails } from '../hooks/useQuestionDetails';
import { questionsRef } from '../services/firebaseService';

function updateQuestion(questionKey: string, question: FormValues) {
  update(child(questionsRef, questionKey), {
    answers: question.answers.map(({ text, points }) => ({
      text,
      points: Number(points),
    })),
  });
}

export const EditQuestionModal: FunctionComponent<{}> = () => {
  const editModal = useModal();
  const navigate = useNavigate();

  useEffect(() => {
    editModal.open();
    return () => {
      editModal.close();
    };
  }, []);

  const { id } = useParams<{ id: string }>();
  const { question, loading } = useQuestionDetails(id);

  function handleEdit(updatedQuestion: FormValues): void {
    if (!id || !question) {
      return;
    }
    updateQuestion(id, updatedQuestion);
    navigate(-1);
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!question) {
    return <div>Question not found</div>;
  }

  return (
    <Modal
      isOpen={editModal.isOpen}
      onClose={() => {
        editModal.close();
        navigate(-1);
      }}
      title={<h2>Edit question</h2>}
    >
      <QuestionForm
        onSubmit={handleEdit}
        initialValues={{
          question: question.text,
          answers: question.answers,
        }}
      />
    </Modal>
  );
};
