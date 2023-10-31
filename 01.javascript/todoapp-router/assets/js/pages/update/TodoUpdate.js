// 할일수정
import Header from "../../layout/Header.js";
import Footer from "../../layout/Footer.js";
import { linkTo } from "../../Router.js";

const TodoUpdate = async function () {
  // const params = new URLSearchParams(location.search);
  // const _id = params.get("_id");

  const page = document.createElement("div");
  page.setAttribute("id", "page");

  const content = document.createElement("div");
  const text = document.createTextNode("수정하기");
  content.appendChild(text);

  let response;

  //초기 content
  const _id = searchParam("_id");
  console.log(_id);

  //쿼리스트링 값 가져오기
  function searchParam(key) {
    return new URLSearchParams(location.search).get(key);
  }

  try {
    response = await axios(`http://localhost:33088/api/todolist/${_id}`);
    const data = response.data.item;
    console.log(data);
  } catch (error) {}

  page.appendChild(Header("TODO App 수정하기"));
  page.appendChild(content);
  page.appendChild(Footer());

  return page;
};

export default TodoUpdate;
