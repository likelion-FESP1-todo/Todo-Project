// 할일 등록
import Header from '../../layout/Header.js';
import Footer from '../../layout/Footer.js';
import TodoList from '../../pages/list/TodoList.js';

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
  const detailInput = document.createElement('input');
  detailInput.setAttribute('type', 'text');
  detail.appendChild(detailText);
  detail.appendChild(detailInput);

  // button
  const registBtn = document.createElement('button');
  const btnText = document.createTextNode('Todo 등록');
  registBtn.setAttribute('type', 'button');
  registBtn.appendChild(btnText);
  registBtn.addEventListener('click', async (e) => {
    const titleVal = titleInput.value;
    const detailVal = detailInput.value;
    console.log(titleVal);
    console.log(detailVal);

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
      // console.log(data);

      // 값 등록 후 목록 조회 컴포넌트로 변경
      await loadComponent(TodoList);
    } catch (err) {
      console.error(err);
    }
  });

  page.appendChild(Header('TODO App 등록'));
  page.appendChild(content);
  page.appendChild(title);
  page.appendChild(detail);
  page.appendChild(registBtn);
  page.appendChild(Footer());

  return page;
};

// 컴포넌트 변경
async function loadComponent(component) {
  const appRoot = document.getElementById('app');
  appRoot.innerHTML = '';
  const componentElement = await component();
  appRoot.appendChild(componentElement);
}

export default TodoRegist;
