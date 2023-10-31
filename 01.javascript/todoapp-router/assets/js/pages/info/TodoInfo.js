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
  header.className = 'Todo-header TodoInfo-header';
  const content = document.createElement('div');

  let response;

  try {
    response = await axios(`http://localhost:33088/api/todolist/${_id}`);
    const data = response.data.item;

    // 상세조회 타이틀
    const h2 = document.createElement('h2');
    const title = document.createTextNode(data.title);
    h2.appendChild(title);
    h2.className = 'Todo-title';
    content.appendChild(h2);

    // 상세조회 내용
    const descArea = document.createElement('div');
    const description = document.createTextNode(data.content);
    descArea.appendChild(description);
    descArea.className = 'TodoInfo-content';
    content.appendChild(descArea);

    //삭제, 수정 버튼 그룹화
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
    btnGroup.appendChild(editBtn);

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
    backBtn.className = 'backButton';
    header.appendChild(backBtn);

    //contentInfo
    const contentInfo = document.createElement('div');

    //생성날짜, 업데이트 날짜 그룹화
    const dateGroup = document.createElement('div');
    dateGroup.className = 'TodoInfo-dateGroup';
    contentInfo.appendChild(dateGroup);

    //생성 날짜
    const date1 = document.createElement('p');
    const createDate = document.createTextNode(`생성일 : ${data.createdAt}`);
    date1.appendChild(createDate);
    dateGroup.appendChild(date1);

    //업데이트 날짜
    const date2 = document.createElement('p');
    const updateDate = document.createTextNode(
      `최종수정일 : ${data.updatedAt}`,
    );
    date2.appendChild(updateDate);
    dateGroup.appendChild(date2);

    //완료, 미완료 표시
    const tag = document.createElement('span');
    tag.className = 'TodoInfo-tag';
    const complete = document.createTextNode('할 일 완료');
    const inComplete = document.createTextNode('할 일 미완료');
    if (data.done === true) {
      tag.appendChild(complete);
      contentInfo.appendChild(tag);
      tag.style.color = '#3D53C7';
    } else {
      tag.appendChild(inComplete);
      contentInfo.appendChild(tag);
      tag.style.color = '#666666';
    }

    content.appendChild(contentInfo);
    contentInfo.className = 'TodoInfo-contentInfo';
  } catch (error) {
    console.log(err);
  }

  page.appendChild(header);
  page.appendChild(content);
  page.appendChild(Footer());

  return page;
};

export default TodoInfo;
