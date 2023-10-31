import Content from './Content.js';

const Pagination = function(totalPages, limitNum, page) {
  const pageBtns = document.createElement('ul');
  for (let i = 0; i < totalPages; i++) {
    const pageBtn = document.createElement('li');
    pageBtn.setAttribute('id', `id_${i + 1}`);
    const pageNum = document.createTextNode(i + 1);
    pageBtn.appendChild(pageNum);
    pageBtns.appendChild(pageBtn);

    pageBtn.addEventListener('click', async (e) => {
      const currntId = e.currentTarget.id.split('_')[1];

      // 기존 content 제거
      const oldContent = document.getElementById('content') || false;
      if (oldContent) {
        page.removeChild(oldContent);
      }

      // 페이지에 따른 content 추가
      const newContent = await Content(currntId, limitNum);
      console.log(newContent)
      page.insertBefore(newContent.content, page.childNodes[2]);

      // 도메인에 쿼리스트링 적용 및 history
      const queryString = `?page=${currntId}&limit=${limitNum}`;
      history.pushState({}, "todo", queryString);
    });
  }
  return pageBtns;
};

export default Pagination;
