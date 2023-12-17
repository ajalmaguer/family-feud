import { FunctionComponent, RefObject } from 'react';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { Button } from '../component-library/Button';
import { Modal } from '../component-library/Modal';
import { TextInput } from '../component-library/TextInput';
import { child, push, update } from 'firebase/database';
import { questionsRef } from '../services/firebaseService';

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

type FormValues = {
  question: string;
  answers: {
    text: string;
    points: number;
  }[];
};

export const NewQuestionModal: FunctionComponent<{
  modalRef: RefObject<HTMLDialogElement>;
}> = ({ modalRef }) => {
  const {
    register,
    control,
    handleSubmit,
    // formState
  } = useForm<FormValues>({
    defaultValues: {
      answers: [{ text: '', points: 0 }],
    },
    mode: 'onBlur',
  });
  // const { errors } = formState;
  const {
    fields: answerFields,
    append: appendAnswer,
    remove: removeAnswer,
  } = useFieldArray({
    name: 'answers',
    control,
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log('submitting', data);
    addQuestion(data);
  };

  return (
    <Modal modalRef={modalRef}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-y-4 mb-4">
          <TextInput
            label="Question"
            inputProps={register('question', { required: true })}
            // error={errors?.question}
          />

          <div className="font-bold">Answers</div>
          {answerFields.map((field, index) => {
            return (
              <div
                key={field.id}
                className="grid grid-cols-[3fr,1fr,1fr] gap-x-4"
              >
                <TextInput
                  label="Answer"
                  inputProps={register(`answers.${index}.text` as const, {
                    required: true,
                  })}
                  // error={errors?.answers?.[index]?.test}
                />
                <TextInput
                  label="Points"
                  inputProps={{
                    ...register(`answers.${index}.points` as const, {
                      required: true,
                    }),
                    type: 'number',
                  }}
                  // error={errors?.answers?.[index]?.points}
                />
                <Button
                  type="button"
                  onClick={() => removeAnswer(index)}
                  style="btn-error"
                  outline
                >
                  DELETE
                </Button>
              </div>
            );
          })}
        </div>
        <Button
          type="button"
          onClick={() =>
            appendAnswer({
              text: '',
              points: 0,
            })
          }
        >
          Add question
        </Button>
        <div className="text-right">
          <Button type="submit" style="btn-primary">
            Submit
          </Button>
        </div>
      </form>
    </Modal>
  );
};

// const Total = ({ control }: { control: Control<FormValues> }) => {
//   const formValues = useWatch({
//     name: 'cart',
//     control,
//   });
//   console.log({ formValues });
//   const total = formValues.reduce(
//     (acc, current) => acc + (current.price || 0) * (current.quantity || 0),
//     0
//   );
//   return <p>Total Amount: {total}</p>;
// };
