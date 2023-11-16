import React, { ChangeEvent } from 'react';

interface InputProps {
  title: string;
  onChange: (value: string) => void;
}

const Input = ({ title = '', onChange }: InputProps) => {
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
        className="Todo-titleInput"
      />
    </h2>
  );
};

export default Input;
