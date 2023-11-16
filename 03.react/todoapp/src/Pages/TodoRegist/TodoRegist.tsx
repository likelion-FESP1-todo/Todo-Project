import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../../Layout/Footer';
import Header from '../../Layout/Header';
import Button from 'Components/Utils/Button';
import Input from 'Components/TodoRegistAndUpdate/Input';
import Textarea from 'Components/TodoRegistAndUpdate/Textarea';
import SendButton from 'Components/TodoRegistAndUpdate/SendButton';
import { useBackEvent } from 'Components/Utils/utilsFunction';
import styles from '../TodoRegistAndUpdate.module.css';
import axios from 'axios';
import { IsValidateInput } from 'Components/Utils/utilsFunction';

const TodoRegist = function () {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const onClickTitleChange = (value: string) => {
    setTitle(value);
  };

  const onClickContentChange = (value: string) => {
    setContent(value);
  };

  const backEvent = useBackEvent();

  const registEvent = async () => {
    if (!IsValidateInput(title, content)) {
      return;
    }
    try {
      const body = { title: title, content: content, done: false };
      await axios.post('http://localhost:33088/api/todolist', body);
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div id="page">
      <Header
        title={'할 일 등록'}
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
          text={'등록하기'}
          event={registEvent}
          className={styles['Todo-button']}
        />
      </section>
      <Footer />
    </div>
  );
};

export default TodoRegist;
