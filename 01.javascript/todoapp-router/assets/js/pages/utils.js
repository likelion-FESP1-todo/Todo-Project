const Button = function (svg, alt, btnEvent) {
  const btn = document.createElement('button');
  const btnIcon = document.createElement('img');
  btnIcon.src = `/assets/img/${svg}.svg`;
  btnIcon.alt = alt;
  btn.appendChild(btnIcon);
  btn.addEventListener('click', btnEvent);
  return btn;
};

const SendButton = function (text, event) {
  const btn = document.createElement('button');
  const btnText = document.createTextNode(text);
  btn.setAttribute('type', 'button');
  btn.className = 'Todo-button';
  btn.appendChild(btnText);
  btn.addEventListener('click', event);
  return btn;
};

export { Button, SendButton };
