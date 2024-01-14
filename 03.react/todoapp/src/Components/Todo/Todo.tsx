import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from './Todo.module.css';

interface TodoProps {
  todo: {
    _id: string;
    title: string;
    done: boolean;
  };
  onDelete: (id: string) => void;
  fetchData: () => void;
}

export default function Todo({ todo, onDelete, fetchData }: TodoProps) {
  const { _id, title } = todo;
  const [menuVisible, setMenuVisible] = useState(false);

  const moveDetail = () => {
    setMenuVisible(!menuVisible);
    // 5초 후 메뉴 숨기기
    setTimeout(() => {
      setMenuVisible(false);
    }, 5000);
  };

  const handleDelete = () => {
    onDelete(_id);
  };

  const onCheck = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      // 서버에 체크박스 상태 업데이트 요청 보내기
      await axios.patch(`http://localhost:33088/api/todolist/${_id}`, {
        done: e.target.checked,
      });
      fetchData();
    } catch (error) {
      console.error('Error 🥲');
    }
  };

  return (
    <li className={styles['TodoList-todoLi']}>
      <label className={styles['TodoList-checkLabel']}>
        <input
          className={styles['TodoList-todoCheck']}
          type="checkbox"
          checked={todo.done}
          onChange={onCheck}
          id={_id}
        />
        <span className={styles['TodoList-checkSpan']}></span>
      </label>
      <span
        className={
          todo.done
            ? `${styles['TodoList-Title']} ${styles['line-through']}`
            : `${styles['TodoList-Title']} ${styles.unset}`
        }
      >
        {title}
      </span>
      <div
        className={styles['TodoList-dotMenu']}
        onClick={moveDetail}
      >
        ⋮
      </div>
      {menuVisible && (
        <div className={styles['TodoList-todoMenu']}>
          <Link
            className={styles['TodoList-moveDatail']}
            to={`info?_id=${_id}`}
          >
            상세조회
          </Link>
          <button
            type="button"
            className={styles['TodoList-moveDatail2']}
            onClick={handleDelete}
          >
            삭제
          </button>
        </div>
      )}
    </li>
  );
}
