import { FunctionComponent } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { Button } from '../component-library/Button';
import { TextInput } from '../component-library/TextInput';

export type FormValues = {
  question: string;
  answers: {
    text: string;
    points: number;
  }[];
};

export const QuestionForm: FunctionComponent<{
  onSubmit: (data: FormValues) => void;
  initialValues?: FormValues;
}> = ({
  onSubmit,
  initialValues = {
    answers: [{ text: '', points: 0 }],
  },
}) => {
  const {
    register,
    control,
    handleSubmit,
    // formState
  } = useForm<FormValues>({
    defaultValues: initialValues,
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

  return (
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
                  min: 1,
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
  );
};
