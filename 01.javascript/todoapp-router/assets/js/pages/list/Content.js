import { linkTo } from '../../Router.js';

const Content = async (pageNum, limitNum) => {
  const content = document.createElement('div');
  content.setAttribute('id', 'content');
  content.setAttribute('class', 'TodoList-content');
  let response;
  try {
    response = await axios(
      `http://localhost:33088/api/todolist?page=${pageNum}&limit=${limitNum}`,
    );

    const ul = document.createElement('ul');
    ul.setAttribute('class', 'todoUl');

    response.data?.items.forEach((item) => {
      const li = document.createElement('li');
      li.setAttribute('class', 'TodoList-todoLi');

      // ⋮ 버튼 div
      const dotMenu = document.createElement('div');
      dotMenu.setAttribute('class', 'TodoList-dotMenu');
      dotMenu.innerText = '⋮';
      dotMenu.addEventListener('click', (e) => {
        const todoMenuStyle = e.target.parentNode.querySelector('.TodoList-todoMenu');
        todoMenuStyle.style.display = todoMenuStyle.style.display === 'flex' ? 'none' : 'flex';
        setTimeout(() => {
          todoMenuStyle.style.display = "none";
        }, 5000);
      });

      // 메뉴 버튼 div
      const menuDiv = document.createElement('div');
      menuDiv.setAttribute('class', 'TodoList-todoMenu');

      // 상세조회 버튼
      const todoInfoLink = document.createElement('a');
      todoInfoLink.innerText = '상세조회';
      todoInfoLink.setAttribute('class', 'TodoList-moveDatail');
      todoInfoLink.setAttribute('href', `info?_id=${item._id}`);
      todoInfoLink.addEventListener('click', async function (e) {
        e.preventDefault(); // 브라우저의 기본 동작 취소(<a> 태그 동작 안하도록)
        linkTo(todoInfoLink.getAttribute('href'));
      });

      // 삭제 버튼
      const todoDelete = document.createElement('button');
      todoDelete.innerText = '삭제';
      todoDelete.setAttribute('type', 'button');
      todoDelete.setAttribute('class', 'TodoList-moveDatail2');
      todoDelete.addEventListener('click', async (e) => {
        const id = item._id;
        const li_tag = e.target.parentNode.parentNode;
        const ul_tag = li_tag.parentNode;

        if (li_tag) {
          if (window.confirm('정말 삭제하시겠습니까?')) {
            const AllTasks = Number(document.querySelector('.TodoList-taskNum').innerText.split(' ')[0]);
            document.querySelector('.TodoList-taskNum').innerText = `${AllTasks-1} tasks`;
            
            // 현재 페이지가 1페이지가 아니고 할 일이 1개인 경우
            if (ul_tag.children.length === 1 && Number(pageNum) !== 1) {
              // 마지막 할 일을 지울 때,
              if (ul_tag.children[0] === li_tag) {
                document.getElementById(`id_${pageNum}`).remove();
                document.getElementById(`id_${Number(pageNum)-1}`).click();
              }
            } else {
              document.getElementById(`id_${pageNum}`).click();
            }

            ul_tag.removeChild(li_tag);


            // url: /todolist/{_id}
            // method: DELETE
            try {
              const response = await axios.delete(
                `http://localhost:33088/api/todolist/${id}`,
              );
              const data = response.data;
              console.log(data);

              // 중간 할 일을 지울 때, 마지막 페이지의 값이 없으면 페이지 지우기
              if ((AllTasks-1) % Number(limitNum) === 0) {
                const totalPageNum = document.querySelectorAll('.TodoList-pageBtn').length;
                document.getElementById(`id_${totalPageNum}`).remove();
              }
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
      titleTag.setAttribute('class', 'TodoList-Title');
      titleTag.innerText = item.title;

      // 완료 체크 박스
      const checkLabel = document.createElement('label');
      checkLabel.setAttribute('class', 'TodoList-checkLabel');
      const checkSpan = document.createElement('span');
      checkSpan.setAttribute('class', 'TodoList-checkSpan');
      const completeCheck = document.createElement('input');
      completeCheck.setAttribute('type', 'checkbox');
      completeCheck.setAttribute('class', 'TodoList-todoCheck');
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

      checkLabel.appendChild(completeCheck);
      checkLabel.appendChild(checkSpan);
      li.appendChild(checkLabel);
      li.appendChild(titleTag);
      li.appendChild(dotMenu);
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