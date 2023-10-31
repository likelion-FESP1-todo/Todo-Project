// 뒤로가기 버튼

const Button = function (svg, alt, btnEvent) {
  const btn = document.createElement('button');
  const btnIcon = document.createElement('img');
  btnIcon.src = `/assets/img/${svg}.svg`;
  btnIcon.alt = alt;
  btn.appendChild(btnIcon);
  btn.addEventListener('click', btnEvent);
  return btn;
};

export { Button };
