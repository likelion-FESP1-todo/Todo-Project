//쿼리스트링 값 가져오기
const SearchParam = function (key: string) {
  return new URLSearchParams(location.search).get(key);
};

// 오늘 날짜 가져와서 변환
const GetToday = function () {
  const date = new Date();
  const year = date.getFullYear();
  const month = ('0' + (1 + date.getMonth())).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);

  const day_week = day_week_text[date.getDay()];

  return year + '년 ' + month + '월 ' + day + '일' + ` (${day_week})`;
};

const day_week_text: { [key: number]: string } = {
  0: '일',
  1: '월',
  2: '화',
  3: '수',
  4: '목',
  5: '금',
  6: '토',
};

export { SearchParam, GetToday };
