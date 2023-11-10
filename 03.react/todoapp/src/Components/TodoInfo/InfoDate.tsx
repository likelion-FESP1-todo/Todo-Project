import React from 'react';
import styles from '../../Pages/TodoInfo/TodoInfo.module.css';

const InfoDate = function ({ data }: { data: TodoItem }) {
  return (
    <div className={styles['TodoInfo-dateGroup']}>
      <p>{`생성일 : ${data.createdAt}`}</p>
      <p>{`최종수정일 : ${data.updatedAt}`}</p>
    </div>
  );
};

export default InfoDate;
