import React from 'react';

const getToday = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = ('0' + (today.getMonth() + 1)).slice(-2);
  const day = ('0' + today.getDate()).slice(-2);
  const dayOfWeek = today.getDay(); // 0 (일요일)부터 6 (토요일)까지의 값

  const formattedDate = `${year}년 ${month}월 ${day}일 (${dayOfWeekText[dayOfWeek]})`;

  return formattedDate;
};

const searchParam = (key: string) => {
  return new URLSearchParams(window.location.search).get(key);
};

const dayOfWeekText: { [key: number]: string } = {
  0: '일',
  1: '월',
  2: '화',
  3: '수',
  4: '목',
  5: '금',
  6: '토',
};

export { getToday, searchParam };
