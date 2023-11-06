// import { linkTo } from "../../Router";
import axios from "axios";
import { DotMenu, MenuDiv } from "./DotMenu";

// 데이터를 가져오는 함수
async function fetchData(pageNum: number, limitNum: number) {
  try {
    const response = await axios<TodoListResponse>(
      `http://localhost:33088/api/todolist?page=${pageNum}&limit=${limitNum}`
    );
    return response;
  } catch (err) {
    console.error("Error fetching data:", err);
    return null;
  }
}

// 타이틀 생성 함수
function createTitleTag(title: string) {
  const titleTag = document.createElement("span");
  titleTag.setAttribute("class", "TodoList-Title");
  titleTag.innerText = title;

  return titleTag;
}

// 체크박스 생성 함수
function createCheckLabel(item: TodoItem, titleTag: HTMLSpanElement) {
  const checkLabel = document.createElement("label");
  checkLabel.setAttribute("class", "TodoList-checkLabel");

  const checkSpan = document.createElement("span");
  checkSpan.setAttribute("class", "TodoList-checkSpan");

  const completeCheck = document.createElement("input");
  completeCheck.setAttribute("type", "checkbox");
  completeCheck.setAttribute("class", "TodoList-todoCheck");
  completeCheck.addEventListener("click", async function (e) {
    const target = e.target as HTMLInputElement;
    titleTag.style.textDecoration = target?.checked ? "line-through" : "unset";

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
        body
      );
    } catch (err) {
      alert("수정 실패");
      console.error(err);
    }
  });

  checkLabel.appendChild(completeCheck);
  checkLabel.appendChild(checkSpan);

  if (item.done) {
    completeCheck.checked = true;
    titleTag.style.textDecoration = "line-through";
  }

  return checkLabel;
}

// UI를 업데이트하는 함수
function renderUI(items: TodoItem[], pageNum: number, limitNum: number) {
  const ul = document.createElement("ul");
  ul.setAttribute("class", "todoUl");

  if (!items) {
    const error = document.createTextNode("일시적인 오류 발생");
    ul.appendChild(error);
    return ul;
  }

  items.forEach((item) => {
    const li = document.createElement("li");
    li.setAttribute("class", "TodoList-todoLi");

    const dotMenu = DotMenu();
    const menuDiv = MenuDiv(item, pageNum, limitNum);
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
