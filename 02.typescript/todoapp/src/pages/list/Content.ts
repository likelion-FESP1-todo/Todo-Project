import { linkTo } from '../../Router';
import axios from 'axios';

// 데이터를 가져오는 함수
async function fetchData(pageNum: number, limitNum: number) {
  try {
    const response = await axios<TodoListResponse>(
      `http://localhost:33088/api/todolist?page=${pageNum}&limit=${limitNum}`,
    );
    return response;
  } catch (err) {
    console.error('Error fetching data:', err);
    return null;
  }
}

// Dot Menu 생성 함수
function createDotMenu() {
  const dotMenu = document.createElement('div');
  dotMenu.setAttribute('class', 'TodoList-dotMenu');
  dotMenu.textContent = '⋮';

  let timeoutId: number;

  dotMenu.addEventListener('click', (e: MouseEvent) => {
    e.stopPropagation(); // 이벤트 버블링을 중지시킴
    const target = e.target as HTMLElement;
    const todoMenu =
      target.parentNode!.querySelector<HTMLElement>('.TodoList-todoMenu');
    if (todoMenu) {
      todoMenu.style.display = 'flex';
    }
    if (timeoutId) clearTimeout(timeoutId);

    // 5초 후 메뉴 숨기기
    timeoutId = setTimeout(() => {
      if (todoMenu) {
        todoMenu.style.display = 'none';
      }
    }, 3000);
  });

  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    const todoMenu =
      document.querySelectorAll<HTMLElement>('.TodoList-todoMenu');

    todoMenu.forEach((todoMenu) => {
      // 클릭된 대상이 dotMenu나 TodoList-todoMenu가 아니라면
      if (!dotMenu.contains(target) && !todoMenu.contains(target)) {
        todoMenu.style.display = 'none';
      }
    });
  });

  return dotMenu;
}

// Menu Div 생성 함수
function createMenuDiv(item: TodoItem, pageNum: number, limitNum: number) {
  const menuDiv = document.createElement('div');
  menuDiv.setAttribute('class', 'TodoList-todoMenu');

  const todoInfoLink = document.createElement('a');
  todoInfoLink.textContent = '상세조회';
  todoInfoLink.setAttribute('class', 'TodoList-moveDatail');
  todoInfoLink.setAttribute('href', `info?_id=${item._id}`);
  todoInfoLink.addEventListener('click', (e) => {
    e.preventDefault();
    linkTo(todoInfoLink.getAttribute('href')!);
  });

  const todoDelete = createDeleteButton(item, pageNum, limitNum);

  menuDiv.appendChild(todoInfoLink);
  menuDiv.appendChild(todoDelete);

  return menuDiv;
}

// 삭제 버튼 생성 함수
function createDeleteButton(item: TodoItem, pageNum: number, limitNum: number) {
  const todoDelete = document.createElement('button');
  todoDelete.textContent = '삭제';
  todoDelete.setAttribute('type', 'button');
  todoDelete.setAttribute('class', 'TodoList-moveDatail2');
  todoDelete.addEventListener('click', (e) =>
    onDelete(e, item, pageNum, limitNum),
  );

  return todoDelete;
}

//Delete Event
async function onDelete(
  e: MouseEvent,
  item: TodoItem,
  pageNum: number,
  limitNum: number,
) {
  const id = item._id;
  const li = (e.target as HTMLElement).parentNode!.parentNode;
  const ul_tag = li && li.parentNode;
  if (!ul_tag) {
    return;
  }

  if (!window.confirm('정말 삭제하시겠습니까?')) {
    return;
  }
  // url: /todolist/{_id}
  // method: DELETE
  try {
    await axios.delete(`http://localhost:33088/api/todolist/${id}`);

    // tasks 수정
    const taskNum = document.querySelector<HTMLElement>('.TodoList-taskNum');
    const AllTasks = Number(taskNum?.innerText.split(' ')[0]);
    taskNum!.innerText = `${AllTasks - 1} tasks`;

    // 할 일이 1개이고 삭제할 경우
    if (ul_tag.children.length === 1 && ul_tag.children[0] === li) {
      if (Number(pageNum) !== 1) {
        document.getElementById(`id_${pageNum}`)!.remove();
        document.getElementById(`id_${Number(pageNum) - 1}`)!.click();
      }
    }
    // 중간 할 일을 지울 때, 마지막 페이지의 값이 없으면 페이지 지우기
    else {
      if ((AllTasks - 1) % Number(limitNum) === 0 && AllTasks > 5) {
        const totalPageNum =
          document.querySelectorAll('.TodoList-pageBtn').length;
        document.getElementById(`id_${totalPageNum}`)!.remove();
      }
      document.getElementById(`id_${Number(pageNum)}`)!.click();
    }

    ul_tag.removeChild(li);
  } catch (err) {
    alert('삭제 실패');
    console.error(err);
  }
}

// 타이틀 생성 함수
function createTitleTag(title: string) {
  const titleTag = document.createElement('span');
  titleTag.setAttribute('class', 'TodoList-Title');
  titleTag.innerText = title;

  return titleTag;
}

// 체크박스 생성 함수
function createCheckLabel(item: TodoItem, titleTag: HTMLSpanElement) {
  const checkLabel = document.createElement('label');
  checkLabel.setAttribute('class', 'TodoList-checkLabel');

  const checkSpan = document.createElement('span');
  checkSpan.setAttribute('class', 'TodoList-checkSpan');

  const completeCheck = document.createElement('input');
  completeCheck.setAttribute('type', 'checkbox');
  completeCheck.setAttribute('class', 'TodoList-todoCheck');
  completeCheck.addEventListener('click', async function (e) {
    const target = e.target as HTMLInputElement;
    titleTag.style.textDecoration = target?.checked ? 'line-through' : 'unset';

    // check 후 서버 통신으로 done을 바꾸기
    // url: /todolist/{_id}
    // method: DELETE
    try {
      const body = {
        title: item.title,
        content: item.content,
        done: target.checked,
      };
      await axios.patch(
        `http://localhost:33088/api/todolist/${item._id}`,
        body,
      );
    } catch (err) {
      alert('수정 실패');
      console.error(err);
    }
  });

  checkLabel.appendChild(completeCheck);
  checkLabel.appendChild(checkSpan);

  if (item.done) {
    completeCheck.checked = true;
    titleTag.style.textDecoration = 'line-through';
  }

  return checkLabel;
}

// UI를 업데이트하는 함수
function renderUI(items: TodoItem[], pageNum: number, limitNum: number) {
  const ul = document.createElement('ul');
  ul.setAttribute('class', 'todoUl');

  if (!items) {
    const error = document.createTextNode('일시적인 오류 발생');
    ul.appendChild(error);
    return ul;
  }

  items.forEach((item) => {
    const li = document.createElement('li');
    li.setAttribute('class', 'TodoList-todoLi');

    const dotMenu = createDotMenu();
    const menuDiv = createMenuDiv(item, pageNum, limitNum);
    const titleTag = createTitleTag(item.title);
    const checkLabel = createCheckLabel(item, titleTag);

    li.appendChild(checkLabel);
    li.appendChild(titleTag);
    li.appendChild(dotMenu);
    li.appendChild(menuDiv);
    ul.appendChild(li);
  });

  return ul;
}

const Content = async (pageNum: number, limitNum: number) => {
  const response = await fetchData(pageNum, limitNum);
  const ul = renderUI(response!.data?.items, pageNum, limitNum);
  return { ul, response };
};

export default Content;
