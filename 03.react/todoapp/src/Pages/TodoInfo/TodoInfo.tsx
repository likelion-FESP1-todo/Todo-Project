import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Footer from '../../Layout/Footer';
import Header from '../../Layout/Header';
import InfoButtons from '../../Components/TodoInfo/InfoButtons';
import InfoDate from '../../Components/TodoInfo/InfoDate';
import CheckBox from '../../Components/TodoInfo/CheckBox';
import Error404 from '../../Components/Utils/Error';
import styles from './TodoInfo.module.css';
import axios from 'axios';

const TodoInfo = function () {
  const [data, setData] = useState<TodoItem | null>(null);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  // const _id = params.get('_id');
  // 확인용으로  id 1  고정 -> 추후 버튼 완성되면 추가하고 고칠 예정
  const _id = 1;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:33088/api/todolist/${_id}`);
        setData(response.data.item);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [_id]);

  return (
    <div id="page">
      <Header
        title="할일 상세 내용"
        className={`${styles['TodoInfo-header']}`}
      >
        <InfoButtons id={_id} />
      </Header>
      {data ? (
        <section>
          <h2 className={styles['Todo-title']}>{data.title}</h2>
          <div className={styles['TodoInfo-content']}>{data.content}</div>
          <div className={styles['TodoInfo-contentInfo']}>
            <InfoDate data={data} />
            <div className={styles['TodoInfo-container']}>
              <CheckBox data={data} />
            </div>
          </div>
        </section>
      ) : (
        <Error404 />
      )}
      <Footer />
    </div>
  );
};

export default TodoInfo;
