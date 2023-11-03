// 할일수정
import Header from '../../layout/Header.js';
import Footer from '../../layout/Footer.js';
import { linkTo } from '../../Router.js';
import { Button, SendButton, BackEvent } from '../buttonUtils.js';
import { Input, IsValidateInput, Textarea } from '../registUpdateUtils.js';

const TodoUpdate = async function () {
  const page = document.createElement('div');
  page.setAttribute('id', 'page');

  const header = Header('할 일 수정');
  header.className = 'Todo-header';
  const backBtn = Button('backButton', '뒤로가기', BackEvent);
  backBtn.className = 'backButton';
  header.appendChild(backBtn);

  //초기 content
  const _id = searchParam('_id');

  //쿼리스트링 값 가져오기
  function searchParam(key) {
    return new URLSearchParams(location.search).get(key);
  }

  let response;
  try {
    response = await axios(`http://localhost:33088/api/todolist/${_id}`);
  } catch (error) {
    console.log(err);
  }
  const data = response.data.item;

  const title = Input(data.title);
  const content = Textarea(data.content);

  const editBtn = SendButton('수정하기', editEvent);
  async function editEvent() {
    const titleVal = title.querySelector('input').value;
    const contentVal = content.querySelector('textarea').value;
    if (!IsValidateInput(titleVal, contentVal)) {
      return;
    }
    try {
      const body = { title: titleVal, content: contentVal, done: data.done };
      await axios.patch(`http://localhost:33088/api/todolist/${_id}`, body);
      linkTo('/');
    } catch (err) {
      console.error(err);
    }
  }

  page.appendChild(header);
  page.appendChild(title);
  page.appendChild(content);
  page.appendChild(editBtn);
  page.appendChild(Footer());

  return page;
};

export default TodoUpdate;
