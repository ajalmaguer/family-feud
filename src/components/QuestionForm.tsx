import { FunctionComponent } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { Button } from '../component-library/Button';
import { TextInput } from '../component-library/TextInput';
import { FormValues } from '../services/questionService';

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
    <form onSubmit={handleSubmit(onSubmit)} className="">
      <div className="flex flex-col gap-y-2 mb-4">
        <div className="mb-2">
          <TextInput
            label="Question"
            inputProps={register('question', { required: true })}
            // error={errors?.question}
          />
        </div>

        <div className="font-bold">Answers</div>
        {answerFields.map((field, index) => {
          return (
            <div
              key={field.id}
              className="grid grid-cols-[3fr,1fr,1fr] gap-x-4 items-center"
            >
              <TextInput
                label={`Answer ${index + 1}`}
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
                  onKeyDown: (e) => {
                    if (e.shiftKey) {
                      return;
                    }
                    if (e.key === 'Tab' && index === answerFields.length - 1) {
                      e.preventDefault();
                      appendAnswer({
                        text: '',
                        points: 0,
                      });
                    }
                  },
                }}
                // error={errors?.answers?.[index]?.points}
              />

              <div>
                <div className="mb-2">&nbsp;</div>
                <Button
                  type="button"
                  onClick={() => removeAnswer(index)}
                  style="btn-error"
                  outline
                >
                  Delete
                </Button>
              </div>
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
