import React, { ChangeEvent } from 'react';

interface InputProps {
  title: string;
  onChange: (value: string) => void;
  className: string;
}

const Input = ({ title, onChange, className }: InputProps) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <h2>
      <input
        type="text"
        placeholder="제목을 입력해주세요."
        value={title}
        onChange={handleChange}
        className={className}
      />
    </h2>
  );
};

export default Input;
