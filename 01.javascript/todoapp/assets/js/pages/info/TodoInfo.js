// 할일 등록
import Header from '../../layout/Header.js';
import Footer from '../../layout/Footer.js';
import { linkTo } from '../../Router.js';
import { Button } from '../utils.js';
import { BackEvent, DeleteEvent } from '../ButtonEvent.js';

const TodoInfo = async function () {
  const params = new URLSearchParams(location.search);
  const _id = params.get('_id');
  s;
  const page = document.createElement('div');
  page.setAttribute('id', 'page');

  const header = Header('할일 상세 내용');
  header.className = 'Todo-header TodoInfo-header';

  let response;
  try {
    response = await axios(`http://localhost:33088/api/todolist/${_id}`);
  } catch (error) {
    console.log(err);
  }
  const data = response.data.item;

  const title = document.createElement('h2');
  const titleText = document.createTextNode(data.title);
  title.appendChild(titleText);
  title.className = 'Todo-title';

  const content = document.createElement('div');
  const contentText = document.createTextNode(data.content);
  content.appendChild(contentText);
  content.className = 'TodoInfo-content';

  //삭제, 수정 버튼 그룹화
  const btnGroup = document.createElement('div');
  btnGroup.className = 'TodoInfo-btnGroup';
  header.appendChild(btnGroup);

  const editBtn = Button('editButton', '수정하기', editEvent);
  function editEvent() {
    const queryString = `?_id=${data._id}`;
    history.pushState({}, 'update', queryString);
    linkTo(`update${queryString}`);
  }
  btnGroup.appendChild(editBtn);

  const deleteBtn = Button('deleteButton', '삭제하기', DeleteEvent);
  btnGroup.appendChild(deleteBtn);

  const backBtn = Button('backButton', '뒤로가기', BackEvent);
  backBtn.className = 'backButton';
  header.appendChild(backBtn);

  //contentInfo
  const contentInfo = document.createElement('div');
  contentInfo.className = 'TodoInfo-contentInfo';

  //생성날짜, 업데이트 날짜 그룹화
  const dateGroup = document.createElement('div');
  dateGroup.className = 'TodoInfo-dateGroup';
  contentInfo.appendChild(dateGroup);

  //생성 날짜
  const createDate = document.createElement('p');
  const createdAt = document.createTextNode(`생성일 : ${data.createdAt}`);
  createDate.appendChild(createdAt);
  dateGroup.appendChild(createDate);

  //업데이트 날짜
  const updateDate = document.createElement('p');
  const updatedAt = document.createTextNode(`최종수정일 : ${data.updatedAt}`);
  updateDate.appendChild(updatedAt);
  dateGroup.appendChild(updateDate);

  //완료, 미완료 표시
  const tag = document.createElement('span');
  tag.className = 'TodoInfo-tag';
  const complete = document.createTextNode('할 일 완료');
  const inComplete = document.createTextNode('할 일 미완료');
  if (data.done === true) {
    tag.appendChild(complete);
    tag.style.color = '#3D53C7';
  } else {
    tag.appendChild(inComplete);
    tag.style.color = '#666666';
  }
  contentInfo.appendChild(tag);

  page.appendChild(header);
  page.appendChild(title);
  page.appendChild(content);
  page.appendChild(contentInfo);
  page.appendChild(Footer());

  return page;
};

export default TodoInfo;
