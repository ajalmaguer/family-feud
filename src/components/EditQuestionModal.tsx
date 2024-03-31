import { FunctionComponent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal, useModal } from '../component-library/Modal';
import { QuestionForm } from '../components/QuestionForm';

export const EditQuestionModal: FunctionComponent<{}> = () => {
  const editModal = useModal();
  const navigate = useNavigate();

  useEffect(() => {
    editModal.open();
    return () => {
      editModal.close();
      // navigate(-1);
    };
  }, []);

  function handleEdit(): void {
    throw new Error('Function not implemented.');
  }

  const question = {} as any;

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
