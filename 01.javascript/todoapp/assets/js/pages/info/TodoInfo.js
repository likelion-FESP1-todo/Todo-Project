// 할일 등록
import Header from "../../layout/Header.js";
import Footer from "../../layout/Footer.js";

const TodoInfo = async function ({ _id } = {}) {
  const page = document.createElement("div");
  page.setAttribute("id", "page");

  const content = document.createElement("div");
  const text = document.createTextNode(`_id=${_id} 상세 조회 화면`);
  content.appendChild(text);

  let response;
  let todoId = 5;
  try {
    response = await axios(`http://localhost:33088/api/todolist/${todoId}`);
    const data = response.data.item;

    // 투두 id
    const idNum = document.createElement("span");
    const id = document.createTextNode(data._id);
    idNum.appendChild(id);
    content.appendChild(idNum);

    // 상세조회 타이틀
    const h2 = document.createElement("h2");
    const title = document.createTextNode(data.title);
    h2.appendChild(title);
    content.appendChild(h2);

    //완료, 미완료 표시
    const tag = document.createElement("span");
    const complete = document.createTextNode("완료");
    const inComplete = document.createTextNode("미완료");
    if (data.done === true) {
      tag.appendChild(complete);
      content.appendChild(tag);
    } else {
      tag.appendChild(inComplete);
      content.appendChild(tag);
    }

    // 상세조회 내용
    const descArea = document.createElement("div");
    const description = document.createTextNode(data.content);
    descArea.appendChild(description);
    content.appendChild(descArea);

    //생성 날짜
    const date1 = document.createElement("p");
    const createDate = document.createTextNode(data.createdAt);
    date1.appendChild(createDate);
    content.appendChild(date1);

    //업데이트 날짜
    const date2 = document.createElement("p");
    const updateDate = document.createTextNode(data.updatedAt);
    date2.appendChild(updateDate);
    content.appendChild(date2);
  } catch (error) {
    console.log(error);
  }

  page.appendChild(Header("TODO App 상세 조회"));
  page.appendChild(content);
  page.appendChild(Footer());

  return page;
};

export default TodoInfo;
