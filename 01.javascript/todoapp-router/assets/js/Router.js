import TodoList from "./pages/list/TodoList.js";
import TodoRegist from "./pages/regist/TodoRegist.js";
import TodoInfo from "./pages/info/TodoInfo.js";
import TodoUpdate from "./pages/update/TodoUpdate.js";

async function getPage() {
    let page;
    switch (location.pathname) {
        case "/":
            page = await TodoList();
            break;
        case "/regist":
            page = TodoRegist();
            break;
        case "/info":
            page = await TodoInfo();
            break;
        case "/update":
            page = TodoUpdate();
            break;
    }

    return page;
}

async function render() {
    const page = await getPage();
    document.querySelector("#page").replaceWith(page);

    // 초기 zoom 설정
    setZoomBasedOnWidth();
}

window.addEventListener("popstate", render);

export function linkTo(url) {
    history.pushState({}, "todo", url);
    render();
}

const Router = async function () {
    return await getPage();
};

// 반응형 줌 설정 (반응형을 적용할 경우에는 아래의 코드 지워도 됨)
function setZoomBasedOnWidth() {
  const windowWidth = window.innerWidth;
  const minWidth = 600;
  const page = document.querySelector("#page");

  if (windowWidth < minWidth) {page.style.zoom = (windowWidth / minWidth);}
  else page.style.zoom = 1;
}
window.addEventListener("resize", setZoomBasedOnWidth);

export default Router;
