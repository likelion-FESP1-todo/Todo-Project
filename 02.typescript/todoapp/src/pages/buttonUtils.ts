import { linkTo } from '../Router';
import axios from 'axios';

const Button = function (svg: string, alt: string, btnEvent: () => void) {
  const btn = document.createElement('button');
  const btnIcon = document.createElement('img');
  btnIcon.src = `/img/${svg}.svg`;
  btnIcon.alt = alt;
  btn.appendChild(btnIcon);
  btn.addEventListener('click', btnEvent);
  return btn;
};

const SendButton = function (text: string, event: () => Promise<void>) {
  const btn = document.createElement('button');
  const btnText = document.createTextNode(text);
  btn.setAttribute('type', 'button');
  btn.className = 'Todo-button';
  btn.appendChild(btnText);
  btn.addEventListener('click', event);
  return btn;
};

const BackEvent = function () {
  window.history.back();
};

const DeleteEvent = async function (_id: string) {
  if (window.confirm('정말 삭제하시겠습니까?')) {
    try {
      await axios.delete(`http://localhost:33088/api/todolist/${_id}`);
      alert('삭제 완료');
      linkTo('/');
    } catch (err) {
      alert('삭제 실패');
      console.error(err);
    }
  }
};

export { Button, SendButton, BackEvent, DeleteEvent };
