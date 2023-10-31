// 할일 목록
import Header from '../../layout/Header.js';
import Footer from '../../layout/Footer.js';
import Pagination from './Pagination.js';
import Content from './Content.js';
import { linkTo } from '../../Router.js';

const TodoList = async function() {
  const page = document.createElement('div');
  page.setAttribute('id', 'page');

  // header
  // page.appendChild(Header('TODO App 목록 조회'));

  // 오늘 날짜 조회
  const H2 = document.createElement('h2');
  H2.setAttribute('class', 'TodoList-H2');
  H2.innerText = getToday();
  page.appendChild(H2);

  // 초기 content
  const pageNum = searchParam('page') || 1;
  const limitNum = searchParam('limit') || 10;
  const newContent = await Content(pageNum, limitNum);
  const totalPages = newContent.response.data.pagination.totalPages;
  const totalNum = newContent.response.data.pagination.total;
  page.insertBefore(newContent.content, page.childNodes[2]);  

  // 페이지네이션 (totalPage, limitNum, page태그)
  page.appendChild(Pagination(totalPages || 1, limitNum, page));

  // 총 Task 수
  const taskNum = document.createElement("p");
  taskNum.setAttribute('class', 'TodoList-taskNum');
  taskNum.innerText = `${totalNum} tasks`;
  page.insertBefore(taskNum, page.childNodes[1]);

  // 등록 버튼
  const btnRegist = document.createElement('button');
  const btnTitle = document.createTextNode('등록');
  btnRegist.appendChild(btnTitle);
  btnRegist.addEventListener('click', () => {
    linkTo('regist');
  });
  page.appendChild(btnRegist);

  // footer
  page.appendChild(Footer());

  return page;
};

// 쿼리스트링 값 가져오기
function searchParam(key) {
  return new URLSearchParams(location.search).get(key);
};

function getToday(){
  const date = new Date();
  const year = date.getFullYear();
  const month = ("0" + (1 + date.getMonth())).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);

  const day_week = day_week_text[date.getDay()];

  return year + "년 " + month + "월 " + day + "일" + ` (${day_week})`;
}

const day_week_text = {
  0: "일",
  1: "월",
  2: "화",
  3: "수",
  4: "목",
  5: "금",
  6: "토",
}

export default TodoList;
