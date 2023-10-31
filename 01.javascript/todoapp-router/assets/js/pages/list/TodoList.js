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
  page.appendChild(Header('TODO App 목록 조회'));

  // 초기 content
  const pageNum = searchParam('page') || 1;
  const limitNum = searchParam('limit') || 10;
  const newContent = await Content(pageNum, limitNum);
  page.insertBefore(newContent.content, page.childNodes[1]);  

  // 페이지네이션 (totalPage, limitNum, page태그)
  page.appendChild(Pagination(newContent.response.data.pagination.totalPages || 1, limitNum, page));

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

export default TodoList;
