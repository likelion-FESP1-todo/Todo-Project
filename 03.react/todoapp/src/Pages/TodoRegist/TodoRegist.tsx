import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../Layout/Footer';
import Header from '../../Layout/Header';
import Button from 'Components/Utils/Button';
import { useBackEvent } from 'Components/Utils/utilsFunction';
import styles from '../TodoRegistAndUpdate.module.css';

const TodoRegist = function () {
  const backEvent = useBackEvent();
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
      <Footer />
    </div>
  );
};

export default TodoRegist;
