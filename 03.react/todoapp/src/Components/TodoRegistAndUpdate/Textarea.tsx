import React, { ChangeEvent } from 'react';

interface TextareaProps {
  content: string;
  onChange: (value: string) => void;
}

const Textarea = ({ content = '', onChange }: TextareaProps) => {
  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value);
  };

  return (
    <section>
      <textarea
        placeholder="내용을 적어주세요."
        className="Todo-contentInput"
        onChange={handleChange}
        value={content}
      />
    </section>
  );
};

export default Textarea;
