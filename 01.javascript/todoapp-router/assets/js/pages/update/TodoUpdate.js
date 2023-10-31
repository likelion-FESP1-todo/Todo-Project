// 할일수정
import Header from '../../layout/Header.js';
import Footer from '../../layout/Footer.js';
import { linkTo } from '../../Router.js';
import { Button } from '../utils.js';

const TodoUpdate = async function () {
  const page = document.createElement('div');
  page.setAttribute('id', 'page');

  let response;

  //초기 content
  const _id = searchParam('_id');
  console.log(_id);

  //쿼리스트링 값 가져오기
  function searchParam(key) {
    return new URLSearchParams(location.search).get(key);
  }

  try {
    response = await axios(`http://localhost:33088/api/todolist/${_id}`);
    const data = response.data.item;
    console.log(data);

    // title
    const title = document.createElement('input');
    title.setAttribute('value', data.title);

    // content
    const content = document.createElement('textarea');
    const contentText = document.createTextNode(data.content);
    content.appendChild(contentText);

    // 뒤로가기 버튼
    const backEvent = function () {
      window.history.back();
    };
    const backBtn = Button('backButton', '뒤로가기', backEvent);

    // 수정하기 버튼
    const editEvent = async function () {
      const titleVal = title.value;
      const contentVal = content.value;
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
    const editBtn = Button('editButton', '수정하기', editEvent);
    editBtn.className = 'move_datail';

    page.appendChild(Header('TODO App 수정하기'));
    page.appendChild(title);
    page.appendChild(content);
    page.appendChild(backBtn);
    page.appendChild(editBtn);
    page.appendChild(Footer());
  } catch (error) {
    console.log(err);
  }

  return page;
};
export default TodoUpdate;
