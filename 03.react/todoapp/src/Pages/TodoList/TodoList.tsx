import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Footer from '../../Layout/Footer';
import Header from '../../Layout/Header';
import { getToday } from '../../Utils/getToday';
import Todo from '../../Components/Todo/Todo';
import styles from './TodoList.module.css';

interface TodoItem {
  _id: string;
  title: string;
  done: boolean;
}

const TodoList = function () {
  const [todos, setTodos] = useState<TodoItem[]>([]);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:33088/api/todolist?page=1&limit=5');
      setTodos(response.data.items);
    } catch (error) {
      console.error('Error 🥲');
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:33088/api/todolist/${id}`);
      setTodos((prev) => prev.filter((todo) => todo._id !== id));
    } catch (error) {
      console.log('Error 🥲');
      console.error(error);
    }
  };

  return (
    <div id="page">
      <Header
        className={styles['TodoList-Header']}
        title={getToday()}
      />
      <p className={styles['TodoList-taskNum']}>{`${todos.length} tasks`}</p>
      <section
        id="content"
        className={styles['TodoList-content']}
      >
        <ul>
          {todos.map((item) => (
            <Todo
              key={item._id}
              todo={item}
              onDelete={handleDelete}
              fetchData={fetchData}
            />
          ))}
        </ul>
      </section>
      <button className={styles['TodoList-writeBtn']}>
        <Link to="/regist">+</Link>
      </button>
      <Footer />
    </div>
  );
};

export default TodoList;
