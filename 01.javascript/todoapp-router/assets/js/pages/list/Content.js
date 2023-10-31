import { linkTo } from '../../Router.js';

const Content = async (pageNum, limitNum) => {
  const content = document.createElement('div');
  content.setAttribute('id', 'content');
  let response;
  try {
    response = await axios(
      `http://localhost:33088/api/todolist?page=${pageNum}&limit=${limitNum}`,
    );

    const ul = document.createElement('ul');
    ul.setAttribute('class', 'todolist');

    response.data?.items.forEach((item) => {
      const li = document.createElement('li');
      li.setAttribute('class', 'todo_li');

      // 메뉴 버튼 div
      const menuDiv = document.createElement('div');
      menuDiv.setAttribute('class', 'todo_menu');

      // 상세조회 버튼
      const todoInfoLink = document.createElement('a');
      todoInfoLink.innerText = '상세조회';
      todoInfoLink.setAttribute('class', 'move_datail');
      todoInfoLink.setAttribute('href', `info?_id=${item._id}`);
      todoInfoLink.addEventListener('click', async function (e) {
        e.preventDefault(); // 브라우저의 기본 동작 취소(<a> 태그 동작 안하도록)
        linkTo(todoInfoLink.getAttribute('href'));
      });

      // 삭제 버튼
      const todoDelete = document.createElement('button');
      todoDelete.innerText = '삭제';
      todoDelete.setAttribute('type', 'button');
      todoDelete.setAttribute('class', 'move_datail');
      todoDelete.addEventListener('click', async (e) => {
        const id = item._id;
        const li_tag = e.target.parentNode;
        const ul_tag = li_tag.parentNode;

        if (li_tag) {
          if (window.confirm('정말 삭제하시겠습니까?')) {
            ul_tag.removeChild(li_tag);

            // url: /todolist/{_id}
            // method: DELETE
            try {
              const response = await axios.delete(
                `http://localhost:33088/api/todolist/${id}`,
              );
              const data = response.data;
              console.log(data);
            } catch (err) {
              alert('삭제 실패');
              console.error(err);
            }
          }
        }
      });

      menuDiv.appendChild(todoInfoLink);
      menuDiv.appendChild(todoDelete);

      // 타이틀
      const titleTag = document.createElement('span');
      titleTag.innerText = item.title;

      // 완료 체크 박스
      const completeCheck = document.createElement('input');
      completeCheck.setAttribute('type', 'checkbox');
      completeCheck.setAttribute('class', 'todo_check');
      completeCheck.addEventListener('click', async function (e) {
        titleTag.style.textDecoration = e.target.checked
          ? 'line-through'
          : 'unset';

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
            body,
          );
          const data = response.data;
          console.log(data);
        } catch (err) {
          alert('수정 실패');
          console.error(err);
        }
      });

      li.appendChild(completeCheck);
      li.appendChild(titleTag);
      li.appendChild(menuDiv);
      ul.appendChild(li);

      // 완료 목록 체크
      if (item.done) {
        completeCheck.checked = true;
        titleTag.style.textDecoration = 'line-through';
      }
    });
    content.appendChild(ul);

  } catch (err) {
    const error = document.createTextNode('일시적인 오류 발생');
    content.appendChild(error);
  }
  return { content, response };
}

export default Content;