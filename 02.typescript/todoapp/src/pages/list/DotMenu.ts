import axios from "axios";
import { linkTo } from "../../Router";

const DotMenu = function () {
  // Dot Menu 생성 함수
  const dotMenu = document.createElement("div");
  dotMenu.setAttribute("class", "TodoList-dotMenu");
  dotMenu.textContent = "⋮";

  let timeoutId: number;

  dotMenu.addEventListener("click", (e: MouseEvent) => {
    e.stopPropagation(); // 이벤트 버블링을 중지시킴
    const target = e.target as HTMLElement;
    const todoMenu =
      target.parentNode!.querySelector<HTMLElement>(".TodoList-todoMenu");
    if (todoMenu) {
      todoMenu.style.display = "flex";
    }
    if (timeoutId) clearTimeout(timeoutId);

    // 5초 후 메뉴 숨기기
    timeoutId = setTimeout(() => {
      if (todoMenu) {
        todoMenu.style.display = "none";
      }
    }, 3000);
  });

  document.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;
    const todoMenu =
      document.querySelectorAll<HTMLElement>(".TodoList-todoMenu");

    todoMenu.forEach((todoMenu) => {
      // 클릭된 대상이 dotMenu나 TodoList-todoMenu가 아니라면
      if (!dotMenu.contains(target) && !todoMenu.contains(target)) {
        todoMenu.style.display = "none";
      }
    });
  });

  return dotMenu;
};

const MenuDiv = function (item: TodoItem, pageNum: number, limitNum: number) {
  // Menu Div 생성 함수
  const menuDiv = document.createElement("div");
  menuDiv.setAttribute("class", "TodoList-todoMenu");

  const todoInfoLink = document.createElement("a");
  todoInfoLink.textContent = "상세조회";
  todoInfoLink.setAttribute("class", "TodoList-moveDatail");
  todoInfoLink.setAttribute("href", `info?_id=${item._id}`);
  todoInfoLink.addEventListener("click", (e) => {
    e.preventDefault();
    linkTo(todoInfoLink.getAttribute("href")!);
  });

  const todoDelete = createDeleteButton(item, pageNum, limitNum);

  menuDiv.appendChild(todoInfoLink);
  menuDiv.appendChild(todoDelete);

  return menuDiv;
};

// 삭제 버튼 생성 함수
function createDeleteButton(item: TodoItem, pageNum: number, limitNum: number) {
  const todoDelete = document.createElement("button");
  todoDelete.textContent = "삭제";
  todoDelete.setAttribute("type", "button");
  todoDelete.setAttribute("class", "TodoList-moveDatail2");
  todoDelete.addEventListener("click", (e) =>
    onDelete(e, item, pageNum, limitNum)
  );

  return todoDelete;
}

//Delete Event
async function onDelete(
  e: MouseEvent,
  item: TodoItem,
  pageNum: number,
  limitNum: number
) {
  const id = item._id;
  const li = (e.target as HTMLElement).parentNode!.parentNode;
  const ul_tag = li && li.parentNode;
  if (!ul_tag) {
    return;
  }

  if (!window.confirm("정말 삭제하시겠습니까?")) {
    return;
  }
  // url: /todolist/{_id}
  // method: DELETE
  try {
    await axios.delete(`http://localhost:33088/api/todolist/${id}`);

    // tasks 수정
    const taskNum = document.querySelector<HTMLElement>(".TodoList-taskNum");
    const AllTasks = Number(taskNum?.innerText.split(" ")[0]);
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
          document.querySelectorAll(".TodoList-pageBtn").length;
        document.getElementById(`id_${totalPageNum}`)!.remove();
      }
      document.getElementById(`id_${Number(pageNum)}`)!.click();
    }

    ul_tag.removeChild(li);
  } catch (err) {
    alert("삭제 실패");
    console.error(err);
  }
}

export { DotMenu, MenuDiv };
