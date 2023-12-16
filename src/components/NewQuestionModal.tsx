import {
  useForm,
  SubmitHandler,
  useFieldArray,
  useWatch,
  Control,
} from 'react-hook-form';
import React, { FunctionComponent, RefObject } from 'react';
import { Modal } from './Modal';
import { TextInput } from './TextInput';

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
  const { register, control, handleSubmit, formState } = useForm<FormValues>({
    defaultValues: {
      answers: [{ text: '', points: 0 }],
    },
    mode: 'onBlur',
  });
  const { errors } = formState;
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
  };

  return (
    <Modal modalRef={modalRef}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <TextInput
            inputProps={register('question', { required: true })}
            // error={errors?.question}
          />
        </div>
        {answerFields.map((field, index) => {
          return (
            <div key={field.id}>
              <TextInput
                inputProps={register(`answers.${index}.text` as const, {
                  required: true,
                })}
                // error={errors?.answers?.[index]?.test}
              />
              <TextInput
                inputProps={register(`answers.${index}.points` as const, {
                  required: true,
                })}
                // error={errors?.answers?.[index]?.points}
              />
              <button type="button" onClick={() => removeAnswer(index)}>
                DELETE
              </button>
            </div>
          );
        })}

        <button
          type="button"
          onClick={() =>
            appendAnswer({
              text: '',
              points: 0,
            })
          }
        >
          APPEND
        </button>
        <input type="submit" />
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
