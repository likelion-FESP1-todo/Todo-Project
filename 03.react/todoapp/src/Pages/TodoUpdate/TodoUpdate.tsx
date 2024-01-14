import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useBackEvent } from 'Hook/useButtonEvent';
import axios from 'axios';
import styles from '../TodoRegistAndUpdate.module.css';
import Header from '../../Layout/Header';
import Footer from '../../Layout/Footer';
import Button from 'Components/Utils/Button';
import Input from 'Components/TodoRegistAndUpdate/Input';
import Textarea from 'Components/TodoRegistAndUpdate/Textarea';
import SendButton from 'Components/TodoRegistAndUpdate/SendButton';

const TodoUpdate = function () {
  const navigate = useNavigate();
  const _id = useLocation().search.split('=')[1];
  const [todoItem, setTodoItem] = useState<TodoItem | ''>('');
  const [title, setTitle] = useState(todoItem && todoItem.title);
  const [content, setContent] = useState(todoItem && todoItem.content);

  useEffect(() => {
    async function loadData() {
      try {
        const response = await axios(`http://localhost:33088/api/todolist/${_id}`);
        setTodoItem(response.data);
        setTitle(response.data.item.title);
        setContent(response.data.item.content);
      } catch (error) {
        console.log('Error 🥲');
        console.error(error);
      }
    }
    loadData();
  }, []);

  const onClickTitleChange = (value: string) => {
    setTitle(value);
  };

  const onClickContentChange = (value: string) => {
    setContent(value);
  };

  const backEvent = useBackEvent();
  const editEvent = async () => {
    if (todoItem) {
      try {
        const body = { title: title, content: content, done: todoItem.done };
        await axios.patch(`http://localhost:33088/api/todolist/${_id}`, body);
        navigate('/');
      } catch (error) {
        console.log('Error 🥲');
        console.error(error);
      }
    }
  };

  return (
    <div id="page">
      <Header
        title={'할 일 수정'}
        className={styles['Todo-header']}
      >
        <Button
          svg={'backButton'}
          alt={'뒤로가기'}
          btnEvent={backEvent}
        />
      </Header>
      <section>
        <Input
          title={title}
          onChange={onClickTitleChange}
          className={styles['Todo-titleInput']}
        />
        <Textarea
          content={content}
          onChange={onClickContentChange}
          className={styles['Todo-contentInput']}
        />
        <SendButton
          text={'수정하기'}
          event={editEvent}
          className={styles['Todo-button']}
        />
      </section>
      <Footer />
    </div>
  );
};

export default TodoUpdate;
