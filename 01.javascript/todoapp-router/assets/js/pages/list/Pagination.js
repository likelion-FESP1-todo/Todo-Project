import Content from './Content.js';

const Pagination = function(totalPages, limitNum, nowPage, page) {

  const pageBtns = document.createElement('ul');
  pageBtns.setAttribute('class', 'TodoList-pageBox');
  for (let i = 0; i < totalPages; i++) {
    const pageBtn = document.createElement('li');
    pageBtn.setAttribute('id', `id_${i + 1}`);

    if (Number(pageBtn.id.split('_')[1]) === Number(nowPage)) {
      pageBtn.setAttribute('class', 'TodoList-now TodoList-pageBtn');
    } else {
      pageBtn.setAttribute('class', 'TodoList-pageBtn');
    }

    const pageNum = document.createTextNode(i + 1);
    pageBtn.appendChild(pageNum);
    pageBtns.appendChild(pageBtn);

    pageBtn.addEventListener('click', async (e) => {
      const currntId = e.currentTarget.id.split('_')[1];
      const currntTag = e.currentTarget;

      Array.from(document.querySelector('.TodoList-pageBox').children).forEach(item => {
        item.classList.remove('TodoList-now');
      })

      currntTag.classList.add('TodoList-now');

      // 기존 content 제거
      const oldContent = document.getElementById('content') || false;
      if (oldContent) {
        page.removeChild(oldContent);
      }

      // 페이지에 따른 content 추가
      const newContent = await Content(currntId, limitNum);
      page.insertBefore(newContent.content, page.childNodes[2]);

      // 도메인에 쿼리스트링 적용 및 history
      const queryString = `?page=${currntId}&limit=${limitNum}`;
      history.pushState({}, "todo", queryString);
    });
  }
  return pageBtns;
};

export default Pagination;
