// 할일 목록
import Header from '../../layout/Header.js';
import Footer from '../../layout/Footer.js';
import TodoRegist from '../regist/TodoRegist.js';
import TodoInfo from '../info/TodoInfo.js';
import { linkTo } from '../../Router.js';
import Pagination from './pagination.js';

const TodoList = async function (pageId = 1) {
  const page = document.createElement('div');
  page.setAttribute('id', 'page');

  const content = document.createElement('div');
  content.setAttribute('id', 'content');
  let response;
  try {
    response = await axios(
      `http://localhost:33088/api/todolist?page=${pageId}&limit=3`,
    );

    const ul = document.createElement('ul');
    ul.setAttribute('class', 'todolist');
    console.log(response);

    response.data?.items.forEach((item) => {
      const li = document.createElement('li');

      // 상세조회 버튼
      const todoInfoLink = document.createElement('a');
      todoInfoLink.innerText = '상세조회';
      todoInfoLink.setAttribute('class', 'move_datail');
      todoInfoLink.setAttribute('href', `info?_id=${item._id}`);

      // 삭제 버튼
      const todoDelete = document.createElement('button');
      todoDelete.innerText = '삭제';
      todoDelete.setAttribute('type', 'button');
      todoDelete.setAttribute('class', 'move_datail');
      todoDelete.addEventListener('click', async (e) => {
        const id = item._id;
        const li_tag = e.target.parentNode;
        const ul_tag = li_tag.parentNode;

        if (li_tag) {
          if (window.confirm('정말 삭제하시겠습니까?')) {
            ul_tag.removeChild(li_tag);

            // url: /todolist/{_id}
            // method: DELETE
            try {
              const response = await axios.delete(
                `http://localhost:33088/api/todolist/${id}`,
              );
              const data = response.data;
              console.log(data);
            } catch (err) {
              alert('삭제 실패');
              console.error(err);
            }
          }
        }
      });

      // 타이틀
      const titleTag = document.createElement('span');
      titleTag.innerText = item.title;

      // 완료 체크 박스
      const completeCheck = document.createElement('input');
      completeCheck.setAttribute('type', 'checkbox');
      completeCheck.setAttribute('class', 'check');
      completeCheck.addEventListener('click', async function (e) {
        titleTag.style.textDecoration = e.target.checked
          ? 'line-through'
          : 'unset';

        // check 후 서버 통신으로 done을 바꾸기
        // url: /todolist/{_id}
        // method: DELETE
        try {
          const body = {
            title: item.title,
            content: item.content,
            done: e.target.checked,
          };
          const response = await axios.patch(
            `http://localhost:33088/api/todolist/${item._id}`,
            body,
          );
          const data = response.data;
          console.log(data);
        } catch (err) {
          alert('수정 실패');
          console.error(err);
        }
      });

      // 상세조회 버튼 클릭 시 동작
      todoInfoLink.addEventListener('click', async function (e) {
        e.preventDefault(); // 브라우저의 기본 동작 취소(<a> 태그 동작 안하도록)
        linkTo(todoInfoLink.getAttribute('href'));
      });

      li.appendChild(completeCheck);
      li.appendChild(titleTag);
      li.appendChild(todoInfoLink);
      li.appendChild(todoDelete);
      ul.appendChild(li);

      // 완료 목록 체크
      if (item.done) {
        completeCheck.checked = true;
        titleTag.style.textDecoration = 'line-through';
      }
    });
    content.appendChild(ul);

    const btnRegist = document.createElement('button');
    const btnTitle = document.createTextNode('등록');
    btnRegist.appendChild(btnTitle);
    content.appendChild(btnRegist);

    btnRegist.addEventListener('click', () => {
      linkTo('regist');
    });
  } catch (err) {
    const error = document.createTextNode('일시적인 오류 발생');
    content.appendChild(error);
  }

  page.appendChild(Header('TODO App 목록 조회'));
  page.appendChild(content);
  page.appendChild(Pagination(response.data?.pagination.totalPages));
  page.appendChild(Footer());

  return page;
};

export default TodoList;
