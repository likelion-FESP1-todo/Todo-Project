// 할일 목록
import './TodoList.css';
import Header from '../../layout/Header';
import Footer from '../../layout/Footer';
import Pagination from './Pagination';
import Content from './Content';
import { linkTo } from '../../Router';
import { SearchParam, GetToday } from '../utils/dataUtils';

const TodoList = async function () {
  const page = document.createElement('div');
  page.setAttribute('id', 'page');

  // 오늘 날짜 조회
  const header = Header(GetToday());
  header.setAttribute('class', 'TodoList-Header');

  // 초기 content
  const content = document.createElement('div');
  content.setAttribute('id', 'content');
  content.setAttribute('class', 'TodoList-content');

  const pageNum = Number(SearchParam('page')) || 1; // 페이지 번호 초기값 설정
  const limitNum = Number(SearchParam('limit')) || 5; // 목록 개수 초기값 설정
  const newContent = await Content(pageNum, limitNum); // 페이지 번호 및 목록 개수로 목록 가져오기
  const totalPages = newContent.response!.data.pagination.totalPages; // 전체 페이지 수
  const totalNum = newContent.response!.data.pagination.total; // 전체 목록 수
  content.appendChild(newContent.ul);

  // 총 Task 수
  const taskNum = document.createElement('p');
  taskNum.setAttribute('class', 'TodoList-taskNum');
  taskNum.innerText = `${totalNum} tasks`;

  // 등록 버튼
  const btnRegist = document.createElement('button');
  btnRegist.textContent = '+';
  btnRegist.setAttribute('class', 'TodoList-writeBtn');
  btnRegist.addEventListener('click', () => {
    linkTo('regist');
  });

  page.appendChild(header);
  page.appendChild(taskNum);
  page.appendChild(content);
  // 페이지네이션 (totalPage, limitNum, page태그)
  page.appendChild(Pagination(totalPages || 1, limitNum, pageNum, content));
  page.appendChild(btnRegist);
  page.appendChild(Footer());

  return page;
};

export default TodoList;
