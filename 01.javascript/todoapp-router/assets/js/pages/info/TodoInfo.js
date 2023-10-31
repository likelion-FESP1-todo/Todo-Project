// 할일 등록
import Header from '../../layout/Header.js';
import Footer from '../../layout/Footer.js';
import { linkTo } from '../../Router.js';
import { Button } from '../utils.js';

const TodoInfo = async function () {
  const params = new URLSearchParams(location.search);
  const _id = params.get('_id');

  const page = document.createElement('div');
  page.setAttribute('id', 'page');

  const header = Header('할일 상세 내용');
  const content = document.createElement('div');
  const text = document.createTextNode(`_id=${_id} 상세 조회 화면`);
  content.appendChild(text);

  let response;

  try {
    response = await axios(`http://localhost:33088/api/todolist/${_id}`);
    const data = response.data.item;

    // 투두 id
    const idNum = document.createElement('span');
    const id = document.createTextNode(data._id);
    idNum.appendChild(id);
    content.appendChild(idNum);

    // 상세조회 타이틀
    const h2 = document.createElement('h2');
    const title = document.createTextNode(data.title);
    h2.appendChild(title);
    content.appendChild(h2);

    //완료, 미완료 표시
    const tag = document.createElement('span');
    const complete = document.createTextNode('완료');
    const inComplete = document.createTextNode('미완료');
    if (data.done === true) {
      tag.appendChild(complete);
      content.appendChild(tag);
    } else {
      tag.appendChild(inComplete);
      content.appendChild(tag);
    }

    // 상세조회 내용
    const descArea = document.createElement('div');
    const description = document.createTextNode(data.content);
    descArea.appendChild(description);
    content.appendChild(descArea);

    //생성 날짜
    const date1 = document.createElement('p');
    const createDate = document.createTextNode(data.createdAt);
    console.log(createDate);
    date1.appendChild(createDate);
    content.appendChild(date1);

    //업데이트 날짜
    const date2 = document.createElement('p');
    const updateDate = document.createTextNode(data.updatedAt);
    date2.appendChild(updateDate);
    content.appendChild(date2);

    //삭제, 수정 버튼
    const btnGroup = document.createElement('div');
    header.appendChild(btnGroup);
    btnGroup.className = 'TodoInfo-btnGroup';

    //수정하기 버튼
    const editEvent = function () {
      const queryString = `?_id=${data._id}`;
      history.pushState({}, 'update', queryString);
      linkTo(`update${queryString}`);
    };
    const editBtn = Button('editButton', '수정하기', editEvent);
    header.appendChild(editBtn);

    // 삭제하기 버튼
    const deleteEvent = async function () {
      console.log('1111');
      if (window.confirm('정말 삭제하시겠습니까?')) {
        try {
          const response = await axios.delete(
            `http://localhost:33088/api/todolist/${_id}`,
          );
          const data = response.data;
          alert('삭제 완료');
          console.log(data);
          linkTo('/');
        } catch (err) {
          alert('삭제 실패');
          console.error(err);
        }
      }
    };
    const deleteBtn = Button('deleteButton', '삭제하기', deleteEvent);
    btnGroup.appendChild(deleteBtn);

    // 뒤로가기 버튼
    const backEvent = function () {
      window.history.back();
    };
    const backBtn = Button('backButton', '뒤로가기', backEvent);
    header.appendChild(backBtn);
  } catch (error) {
    console.log(err);
  }

  page.appendChild(header);
  page.appendChild(content);
  page.appendChild(Footer());

  return page;
};

export default TodoInfo;
