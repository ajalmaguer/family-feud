import { FunctionComponent } from 'react';

export const TextInput: FunctionComponent<{
  inputProps: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >;
}> = ({ inputProps }) => {
  return (
    <input
      type="text"
      placeholder="Type here"
      className="input input-bordered w-full max-w-xs"
      {...inputProps}
    />
  );
};
