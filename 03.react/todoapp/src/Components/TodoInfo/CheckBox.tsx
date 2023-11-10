import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../../Pages/TodoInfo/TodoInfo.module.css';

const CheckBox = function ({ data }: { data: TodoItem }) {
  const [isChecked, setIsChecked] = useState(data.done);
  const [text, setText] = useState(data.done ? '할 일 완료' : '할 일 미완료');
  const [color, setColor] = useState(data.done ? '#3D53C7' : '#666666');

  const handleCheck = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    try {
      const body = {
        title: data.title,
        content: data.content,
        done: target.checked,
      };
      const res = await axios.patch(
        `http://localhost:33088/api/todolist/${data._id}`,
        body
      );
      const done = res.data.item.done;
      if (done === true) {
        setText('할 일 완료');
        setColor('#3D53C7');
      }
      if (done === false) {
        setText('할 일 미완료');
        setColor('#666666');
      }
      setIsChecked(done);
    } catch (err) {
      alert('수정 실패');
      console.error(err);
    }
  };

  useEffect(() => {
    setIsChecked(data.done);
  }, [data.done]);

  return (
    <>
      <div className={styles['TodoInfo-checkbox']}>
        <label className={styles['TodoList-checkLabel']}>
          <input
            type="checkBox"
            className={styles['TodoList-todoCheck']}
            checked={isChecked}
            onChange={handleCheck}
          />
          <span className={styles['TodoList-checkSpan']}></span>
        </label>
      </div>
      <span
        className={styles['TodoInfo-tag']}
        style={{ color: color, fontSize: '24px' }}
      >
        {text}
      </span>
    </>
  );
};

export default CheckBox;
