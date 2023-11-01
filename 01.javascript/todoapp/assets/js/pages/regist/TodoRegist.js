// 할일 등록
import Header from '../../layout/Header.js';
import Footer from '../../layout/Footer.js';
import { linkTo } from '../../Router.js';
import { Button, SendButton, Input, Textarea } from '../utils.js';
import { BackEvent, IsValidateInput } from '../ButtonEvent.js';

const TodoRegist = function () {
  const page = document.createElement('div');
  page.setAttribute('id', 'page');

  const header = Header('할 일 등록');
  header.className = 'Todo-header';
  const backBtn = Button('backButton', '뒤로가기', BackEvent);
  backBtn.className = 'backButton';
  header.appendChild(backBtn);

  const title = Input();
  const content = Textarea();

  const registBtn = SendButton('등록하기', registEvent);
  async function registEvent() {
    const titleVal = title.querySelector('input').value;
    const contentVal = content.querySelector('textarea').value;
    if (!IsValidateInput(titleVal, contentVal)) {
      return;
    }
    // url: /todolist
    // method: POST
    try {
      const body = { title: titleVal, content: contentVal, done: false };
      await axios.post('http://localhost:33088/api/todolist', body);
      linkTo('/');
    } catch (err) {
      console.error(err);
    }
  }

  page.appendChild(header);
  page.appendChild(title);
  page.appendChild(content);
  page.appendChild(registBtn);
  page.appendChild(Footer());

  return page;
};

export default TodoRegist;
