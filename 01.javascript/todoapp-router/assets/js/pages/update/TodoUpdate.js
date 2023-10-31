// 할일수정
import Header from '../../layout/Header.js';
import Footer from '../../layout/Footer.js';
import { linkTo } from '../../Router.js';
import { Button, SendButton } from '../utils.js';

const TodoUpdate = async function () {
  const page = document.createElement('div');
  page.setAttribute('id', 'page');

  const header = Header('할 일 수정');
  header.className = 'Todo-header';

  // 뒤로가기 버튼
  const backEvent = function () {
    window.history.back();
  };
  const backBtn = Button('backButton', '뒤로가기', backEvent);
  backBtn.className = 'backButton';
  header.appendChild(backBtn);

  //초기 content
  const _id = searchParam('_id');
  console.log(_id);

  //쿼리스트링 값 가져오기
  function searchParam(key) {
    return new URLSearchParams(location.search).get(key);
  }

  let response;

  try {
    response = await axios(`http://localhost:33088/api/todolist/${_id}`);
    const data = response.data.item;
    console.log(data);

    // title
    const title = document.createElement('div');
    const titleInput = document.createElement('input');
    titleInput.setAttribute('type', 'text');
    titleInput.setAttribute('placeholder', '제목을 입력해주세요.');
    titleInput.setAttribute('value', data.title);
    titleInput.className = 'Todo-titleInput';
    title.appendChild(titleInput);

    // content
    const content = document.createElement('div');
    const contentInput = document.createElement('textarea');
    contentInput.setAttribute('placeholder', '내용을 적어주세요.');
    const contentText = document.createTextNode(data.content);
    contentInput.appendChild(contentText);
    contentInput.className = 'Todo-contentInput';
    content.appendChild(contentInput);

    // 수정하기 버튼
    const editEvent = async function () {
      const titleVal = titleInput.value;
      const contentVal = contentInput.value;
      // 값 체크
      if (!titleVal || !contentVal) {
        alert('제목과 상세내용을 모두 입력해주세요!');
        return;
      }
      // url: /todolist
      // method: POST
      // body: {"title": value, "content": value}
      try {
        const body = { title: titleVal, content: contentVal, done: data.done };
        await axios.patch(`http://localhost:33088/api/todolist/${_id}`, body);
        linkTo('/');
      } catch (err) {
        console.error(err);
      }
    };
    const editBtn = SendButton('수정하기', editEvent);

    page.appendChild(header);
    page.appendChild(title);
    page.appendChild(content);
    page.appendChild(editBtn);
    page.appendChild(Footer());
  } catch (error) {
    console.log(err);
  }

  return page;
};
export default TodoUpdate;
