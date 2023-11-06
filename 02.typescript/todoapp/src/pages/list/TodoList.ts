// 할일 목록
import './TodoList.css';
import Footer from '../../layout/Footer';
import Pagination from './Pagination';
import Content from './Content';
import { linkTo } from '../../Router';

const TodoList = async function () {
  const page = document.createElement('div');
  page.setAttribute('id', 'page');

  // 오늘 날짜 조회
  const H2 = document.createElement('h2');
  H2.setAttribute('class', 'TodoList-H2');
  H2.innerText = getToday();
  page.appendChild(H2);

  // 초기 content
  const content = document.createElement('div');
  content.setAttribute('id', 'content');
  content.setAttribute('class', 'TodoList-content');
  page.appendChild(content);

  const pageNum = Number(searchParam('page')) || 1; // 페이지 번호 초기값 설정
  const limitNum = Number(searchParam('limit')) || 5; // 목록 개수 초기값 설정
  const newContent = await Content(pageNum, limitNum); // 페이지 번호 및 목록 개수로 목록 가져오기
  const totalPages = newContent.response!.data.pagination.totalPages; // 전체 페이지 수
  const totalNum = newContent.response!.data.pagination.total; // 전체 목록 수
  content.appendChild(newContent.ul);

  // 페이지네이션 (totalPage, limitNum, page태그)

  page.appendChild(Pagination(totalPages || 1, limitNum, pageNum, content));

  // 총 Task 수
  const taskNum = document.createElement('p');
  taskNum.setAttribute('class', 'TodoList-taskNum');
  taskNum.innerText = `${totalNum} tasks`;
  page.insertBefore(taskNum, page.childNodes[1]);

  // 등록 버튼
  const btnRegist = document.createElement('button');
  btnRegist.textContent = '+';
  btnRegist.setAttribute('class', 'TodoList-writeBtn');
  btnRegist.addEventListener('click', () => {
    linkTo('regist');
  });
  page.appendChild(btnRegist);

  // footer
  page.appendChild(Footer());

  return page;
};

// 쿼리스트링 값 가져오기
function searchParam(key: string) {
  return new URLSearchParams(location.search).get(key);
}

// 오늘 날짜 가져와서 변환
function getToday() {
  const date = new Date();
  const year = date.getFullYear();
  const month = ('0' + (1 + date.getMonth())).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);

  const day_week = day_week_text[date.getDay()];

  return year + '년 ' + month + '월 ' + day + '일' + ` (${day_week})`;
}

const day_week_text: { [key: number]: string } = {
  0: '일',
  1: '월',
  2: '화',
  3: '수',
  4: '목',
  5: '금',
  6: '토',
};

export default TodoList;
