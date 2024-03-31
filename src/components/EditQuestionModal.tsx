import { FunctionComponent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { RouteModal } from '../component-library/RouteModal';
import { QuestionForm } from '../components/QuestionForm';
import { useQuestionDetails } from '../hooks/useQuestionDetails';
import { FormValues, updateQuestion } from '../services/questionService';

export const EditQuestionModal: FunctionComponent<{}> = () => {
  const navigate = useNavigate();

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
    <RouteModal title={<>Edit question</>}>
      <QuestionForm
        onSubmit={handleEdit}
        initialValues={{
          question: question.text,
          answers: question.answers,
        }}
      />
    </RouteModal>
  );
};
