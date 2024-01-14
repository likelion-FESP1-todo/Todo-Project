import React, { ChangeEvent } from 'react';

interface TextareaProps {
  content: string;
  onChange: (value: string) => void;
  className: string;
}

const Textarea = ({ content, onChange, className }: TextareaProps) => {
  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value);
  };

  return (
    <textarea
      placeholder="내용을 적어주세요."
      className={className}
      onChange={handleChange}
      value={content}
    />
  );
};

export default Textarea;
