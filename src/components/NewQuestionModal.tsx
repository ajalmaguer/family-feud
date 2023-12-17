import { child, push, update } from 'firebase/database';
import { FunctionComponent, RefObject } from 'react';
import { Modal } from '../component-library/Modal';
import { questionsRef } from '../services/firebaseService';
import { FormValues, QuestionForm } from './QuestionForm';

function addQuestion(question: FormValues) {
  const res = push(questionsRef, { text: question.question });
  if (!res.key) {
    return;
  }

  update(child(questionsRef, res.key), {
    answers: question.answers.map(({ text, points }) => ({
      text,
      points: Number(points),
    })),
  });
}

export const NewQuestionModal: FunctionComponent<{
  modalRef: RefObject<HTMLDialogElement>;
  onClose?: () => void;
}> = ({ modalRef, onClose = () => {} }) => {
  return (
    <Modal modalRef={modalRef}>
      <QuestionForm
        onSubmit={(data) => {
          addQuestion(data);
          onClose();
        }}
      />
    </Modal>
  );
};
