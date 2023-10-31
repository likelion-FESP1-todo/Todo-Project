// 할일 등록
import Header from '../../layout/Header.js';
import Footer from '../../layout/Footer.js';
import { linkTo } from '../../Router.js';
import { Button } from '../utils.js';

const TodoRegist = function () {
  const page = document.createElement('div');
  page.setAttribute('id', 'page');

  const content = document.createElement('div');
  const text = document.createTextNode('등록 화면');
  content.appendChild(text);

  // title
  const title = document.createElement('div');
  const titleText = document.createTextNode('제목');
  const titleInput = document.createElement('input');
  titleInput.setAttribute('type', 'text');
  title.appendChild(titleText);
  title.appendChild(titleInput);

  // content
  const detail = document.createElement('div');
  const detailText = document.createTextNode('상세내용');
  const detailInput = document.createElement('textarea');
  // detailInput.setAttribute('type', 'text');
  detail.appendChild(detailText);
  detail.appendChild(detailInput);

  // button
  const registBtn = document.createElement('button');
  const btnText = document.createTextNode('Todo 등록');
  registBtn.setAttribute('type', 'button');
  registBtn.appendChild(btnText);

  // 뒤로가기 버튼
  const backEvent = function () {
    window.history.back();
  };
  const backBtn = Button('backButton', '뒤로가기', backEvent);

  registBtn.addEventListener('click', async (e) => {
    const titleVal = titleInput.value;
    const detailVal = detailInput.value;

    // 값 체크
    if (!titleVal || !detailVal) {
      alert('제목과 상세내용을 모두 입력해주세요!');
      return;
    }

    // url: /todolist
    // method: POST
    // body: {"title": value, "content": value}
    try {
      const body = { title: titleVal, content: detailVal, done: false };
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
  });

  page.appendChild(Header('TODO App 등록'));
  page.appendChild(content);
  page.appendChild(title);
  page.appendChild(detail);
  page.appendChild(backBtn);
  page.appendChild(registBtn);
  page.appendChild(Footer());

  return page;
};

export default TodoRegist;
