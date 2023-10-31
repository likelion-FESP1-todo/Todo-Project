// 할일 등록
import Header from '../../layout/Header.js';
import Footer from '../../layout/Footer.js';
import { linkTo } from '../../Router.js';
import { Button, SendButton, Input, Textarea } from '../utils.js';

const TodoRegist = function () {
  const page = document.createElement('div');
  page.setAttribute('id', 'page');

  const header = Header('할 일 등록');
  header.className = 'Todo-header';

  // 뒤로가기 버튼
  const backEvent = function () {
    window.history.back();
  };
  const backBtn = Button('backButton', '뒤로가기', backEvent);
  backBtn.className = 'backButton';
  header.appendChild(backBtn);

  // title
  const title = Input();

  // content
  const content = Textarea();

  // button
  const registEvent = async function () {
    const titleVal = title.querySelector('input').value;
    const contentVal = content.querySelector('textarea').value;
    if (titleVal.length >= 50) {
      alert('50자 미만으로 입력해주세요.');
      titleVal = titleInput.value.substring(0, 50);
      return;
    }

    // 값 체크
    if (!titleVal || !contentVal) {
      alert('제목과 상세내용을 모두 입력해주세요!');
      return;
    }

    // url: /todolist
    // method: POST
    // body: {"title": value, "content": value}
    try {
      const body = { title: titleVal, content: contentVal, done: false };
      const response = await axios.post(
        'http://localhost:33088/api/todolist',
        body,
      );
      const data = response.data;
      console.log(data);
      linkTo('/');
    } catch (err) {
      console.error(err);
    }
  };
  const registBtn = SendButton('등록하기', registEvent);

  page.appendChild(header);
  page.appendChild(title);
  page.appendChild(content);
  page.appendChild(registBtn);
  page.appendChild(Footer());

  return page;
};

export default TodoRegist;
