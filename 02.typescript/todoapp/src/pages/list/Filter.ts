const Filter = function () {
  const div = document.createElement("div");
  const buttonAll = document.createElement("button");
  const buttonComplete = document.createElement("button");
  const buttonIncomplete = document.createElement("button");

  buttonAll.textContent = "전체";
  buttonComplete.textContent = "완료";
  buttonIncomplete.textContent = "미완료";

  div.setAttribute("class", "TodoList-filter");
  buttonAll.setAttribute("class", "TodoList-btnAll active");
  buttonComplete.setAttribute("class", "TodoList-btnComplete");
  buttonIncomplete.setAttribute("class", "TodoList-btnIncomplete");

  div.appendChild(buttonAll);
  div.appendChild(buttonComplete);
  div.appendChild(buttonIncomplete);

  div.addEventListener("click", (e) => {
    const buttons = document.querySelectorAll("button");
    buttons.forEach((item) => {
      item.classList.remove("active");
    });

    (e.target as HTMLElement).classList.add("active");

    // const Content = async (pageNum: number, limitNum: number) => {
    //     const response = await fetchData(pageNum, limitNum);
    //     const ul = renderUI(response!.data?.items, pageNum, limitNum);
    //     return { ul, response };
    //   };
  });

  return div;
};

export default Filter;
