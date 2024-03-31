import { FunctionComponent } from 'react';
import { Modal } from '../component-library/Modal';
import { QuestionForm } from './QuestionForm';
import { addQuestion } from '../services/questionService';

export const NewQuestionModal: FunctionComponent<{
  isOpen: boolean;
  onClose?: () => void;
}> = ({ isOpen, onClose = () => {} }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <QuestionForm
        onSubmit={(data) => {
          if (
            confirm('Are you sure you want to add this question?') === false
          ) {
            return;
          }
          addQuestion(data);
          onClose();
        }}
      />
    </Modal>
  );
};
