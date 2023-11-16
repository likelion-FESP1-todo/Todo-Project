import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Footer from '../../Layout/Footer';
import Header from '../../Layout/Header';
import InfoButtons from '../../Components/TodoInfo/InfoButtons';
import InfoDate from '../../Components/TodoInfo/InfoDate';
import CheckBox from '../../Components/CheckBox/CheckBox';
import Error404 from '../../Components/Utils/Error';
import styles from './TodoInfo.module.css';
import axios from 'axios';

const TodoInfo = function () {
  const [data, setData] = useState<TodoItem | null>(null);
  const [text, setText] = useState('');
  const [color, setColor] = useState('');
  const location = useLocation();
  // location의 search 값 = "?_id=1"
  const _id = Number(location.search.split('_id=')[1]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:33088/api/todolist/${_id}`);
        setData(response.data.item);
        setText(response.data.item.done ? '할 일 완료' : '할 일 미완료');
        setColor(response.data.item.done ? '#3D53C7' : '#666666');
      } catch (error) {
        console.log('Error 🥲');
        console.error(error);
      }
    };
    fetchData();
  }, [_id]);

  // CheckBox에서 체크 상태가 변경되었을 때 호출할 함수
  const handleCheckChange = (done: boolean) => {
    setText(done ? '할 일 완료' : '할 일 미완료');
    setColor(done ? '#3D53C7' : '#666666');
  };

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
              <CheckBox
                data={data}
                onCheckChange={handleCheckChange}
              />
              <span
                className={styles['TodoInfo-tag']}
                style={{ color: color }}
              >
                {text}
              </span>
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
