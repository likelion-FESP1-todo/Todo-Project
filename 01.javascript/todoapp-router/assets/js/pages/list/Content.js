import { linkTo } from "../../Router.js";

// 데이터를 가져오는 함수
async function fetchData(pageNum, limitNum) {
  try {
    const response = await axios(`http://localhost:33088/api/todolist?page=${pageNum}&limit=${limitNum}`);
    return response;
  } catch (err) {
    console.error("Error fetching data:", err);
    return null;
  }
}

// Dot Menu 생성 함수
function createDotMenu() {
  const dotMenu = document.createElement("div");
  dotMenu.setAttribute("class", "TodoList-dotMenu");
  dotMenu.innerText = "⋮";

  let timeoutId;

  dotMenu.addEventListener("click", (e) => {
    e.stopPropagation(); // 이벤트 버블링을 중지시킴
    const todoMenuStyle = e.target.parentNode.querySelector(".TodoList-todoMenu");
    todoMenuStyle.style.display = "flex";

    if (timeoutId) clearTimeout(timeoutId);

    // 5초 후 메뉴 숨기기
    timeoutId = setTimeout(() => {
      todoMenuStyle.style.display = "none";
    }, 3000);
  });

  document.addEventListener("click", (e) => {
    const todoMenuStyles = document.querySelectorAll(".TodoList-todoMenu");
    
    todoMenuStyles.forEach(todoMenuStyle => {
      // 클릭된 대상이 dotMenu나 TodoList-todoMenu가 아니라면
      if (!dotMenu.contains(e.target) && !todoMenuStyle.contains(e.target)) {
        todoMenuStyle.style.display = "none";
      }
    });
  });

  return dotMenu;
}

// Menu Div 생성 함수
function createMenuDiv(item, pageNum, limitNum) {
  const menuDiv = document.createElement("div");
  menuDiv.setAttribute("class", "TodoList-todoMenu");

  const todoInfoLink = document.createElement("a");
  todoInfoLink.innerText = "상세조회";
  todoInfoLink.setAttribute("class", "TodoList-moveDatail");
  todoInfoLink.setAttribute("href", `info?_id=${item._id}`);
  todoInfoLink.addEventListener("click", (e) => {
    e.preventDefault();
    linkTo(todoInfoLink.getAttribute("href"));
  });

  const todoDelete = createDeleteButton(item, pageNum, limitNum);

  menuDiv.appendChild(todoInfoLink);
  menuDiv.appendChild(todoDelete);

  return menuDiv;
}

// 삭제 버튼 생성 함수
function createDeleteButton(item, pageNum, limitNum) {
  const todoDelete = document.createElement("button");
  todoDelete.innerText = "삭제";
  todoDelete.setAttribute("type", "button");
  todoDelete.setAttribute("class", "TodoList-moveDatail2");
  todoDelete.addEventListener("click", async (e) => {
    const id = item._id;
    const li_tag = e.target.parentNode.parentNode;
    const ul_tag = li_tag.parentNode;

    if (li_tag) {
      if (window.confirm("정말 삭제하시겠습니까?")) {
        // url: /todolist/{_id}
        // method: DELETE
        try {
          const response = await axios.delete(
            `http://localhost:33088/api/todolist/${id}`
          );
          const data = response.data;

          const AllTasks = Number(document.querySelector(".TodoList-taskNum").innerText.split(" ")[0]);
          document.querySelector(".TodoList-taskNum").innerText = `${AllTasks - 1} tasks`;

          // 할 일이 1개이고 삭제할 경우
          if (ul_tag.children.length === 1 && ul_tag.children[0] === li_tag) {
            if (Number(pageNum) !== 1) document.getElementById(`id_${pageNum}`).remove();
            document.getElementById(`id_${Number(pageNum) - 1}`).click();
          } 
          // 중간 할 일을 지울 때, 마지막 페이지의 값이 없으면 페이지 지우기
          else {
            if ((AllTasks - 1) % Number(limitNum) === 0 && AllTasks > 5) {
              const totalPageNum = document.querySelectorAll(".TodoList-pageBtn").length;
              document.getElementById(`id_${totalPageNum}`).remove();
            }
            document.getElementById(`id_${Number(pageNum)}`).click();
          }

          ul_tag.removeChild(li_tag);
        } catch (err) {
          alert("삭제 실패");
          console.error(err);
        }
      }
    }
  });

  return todoDelete;
}

// 타이틀 생성 함수
function createTitleTag(title) {
  const titleTag = document.createElement("span");
  titleTag.setAttribute("class", "TodoList-Title");
  titleTag.innerText = title;

  titleTag.addEventListener('click', (e) => {
    e.target.previousElementSibling.click();
  });
  return titleTag;
}

// 체크박스 생성 함수
function createCheckLabel(item, titleTag) {
  const checkLabel = document.createElement("label");
  checkLabel.setAttribute("class", "TodoList-checkLabel");

  const checkSpan = document.createElement("span");
  checkSpan.setAttribute("class", "TodoList-checkSpan");

  const completeCheck = document.createElement("input");
  completeCheck.setAttribute("type", "checkbox");
  completeCheck.setAttribute("class", "TodoList-todoCheck");
  completeCheck.addEventListener("click", async function (e) {
    titleTag.style.textDecoration = e.target.checked
      ? "line-through"
      : "unset";

    // check 후 서버 통신으로 done을 바꾸기
    // url: /todolist/{_id}
    // method: DELETE
    try {
      const body = {
        title: item.title,
        content: item.content,
        done: e.target.checked,
      };
      const response = await axios.patch(
        `http://localhost:33088/api/todolist/${item._id}`,
        body
      );
      const data = response.data;
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
function renderUI(items, pageNum, limitNum) {
  const ul = document.createElement("ul");
  ul.setAttribute("class", "todoUl");

  if (!items) {
    const error = document.createTextNode("일시적인 오류 발생");
    ul.appendChild(error);
    return ul;
  }

  items.forEach(item => {
    const li = document.createElement("li");
    li.setAttribute("class", "TodoList-todoLi");

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

const Content = async (pageNum, limitNum) => {
  const response = await fetchData(pageNum, limitNum);
  const ul = renderUI(response.data?.items, pageNum, limitNum);
  return { ul, response };
};

export default Content;