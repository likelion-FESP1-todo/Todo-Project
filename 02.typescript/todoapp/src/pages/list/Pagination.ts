import Content from './Content';

const Pagination = function (
  totalPages: number,
  limitNum: number,
  nowPage: number,
  content: HTMLDivElement,
) {
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

    const pageNum = document.createTextNode((i + 1).toString());
    pageBtn.appendChild(pageNum);
    pageBtns.appendChild(pageBtn);

    pageBtn.addEventListener('click', (e) => pagenationEvent(e));
  }

  async function pagenationEvent(e: MouseEvent) {
    const currentTarget = e.currentTarget as HTMLElement;
    const currntId = Number(currentTarget.id.split('_')[1]);
    const currntTag = currentTarget;

    document.querySelectorAll('.TodoList-pageBtn').forEach((item) => {
      item.classList.remove('TodoList-now');
    });
    currntTag.classList.add('TodoList-now');

    // 기존 content 제거
    content.innerHTML = '';

    // 페이지에 따른 content 추가
    const newContent = await Content(currntId, limitNum);
    content.appendChild(newContent.ul);

    // 도메인에 쿼리스트링 적용 및 history
    const queryString = `?page=${currntId}&limit=${limitNum}`;
    history.pushState({}, 'todo', queryString);
  }

  return pageBtns;
};

export default Pagination;
