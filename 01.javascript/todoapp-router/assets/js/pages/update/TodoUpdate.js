// 할일수정
import Header from "../../layout/Header.js";
import Footer from "../../layout/Footer.js";
import { linkTo } from "../../Router.js";

const TodoUpdate = function () {
    const page = document.createElement("div");
    page.setAttribute("id", "page");

    const content = document.createElement("div");
    const text = document.createTextNode("수정하기");
    content.appendChild(text);

    page.appendChild(Header("TODO App 수정하기"));
    page.appendChild(content);
    page.appendChild(Footer());

    return page;
};

export default TodoUpdate;
