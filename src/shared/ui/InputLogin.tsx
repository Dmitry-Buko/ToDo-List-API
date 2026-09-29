import { ChangeEventHandler } from "react";

interface IInputLoginProps {
  type: string;
  name: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  placeholder: string;
}

const InputLogin = ({
  type,
  name,
  value,
  onChange,
  placeholder,
}: IInputLoginProps) => {
  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required
    />
  );
};

export default InputLogin;
