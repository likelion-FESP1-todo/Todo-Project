// 페이지네이션
import { linkTo } from '../../Router.js';
import TodoList from './TodoList.js';

const Pagination = function (totalPages = 1) {
  const pageBtns = document.createElement('ul');
  for (let i = 0; i < totalPages; i++) {
    const pageBtn = document.createElement('li');
    pageBtn.setAttribute('id', `id_${i + 1}`);
    const pageNum = document.createTextNode(i + 1);
    pageBtn.appendChild(pageNum);
    pageBtns.appendChild(pageBtn);

    pageBtn.addEventListener('click', (e) => {
      const currntId = e.currentTarget.id.split('_')[1];
      TodoList(currntId);
      console.log(currntId);
    });
  }
  return pageBtns;
};

export default Pagination;
