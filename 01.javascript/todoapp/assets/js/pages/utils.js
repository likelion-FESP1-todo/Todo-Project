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

const Input = function (title = '') {
  const inputDiv = document.createElement('h2');
  const input = document.createElement('input');
  input.setAttribute('type', 'text');
  input.setAttribute('placeholder', '제목을 입력해주세요.');
  input.setAttribute('value', title);
  input.className = 'Todo-titleInput';
  inputDiv.appendChild(input);
  return inputDiv;
};

const Textarea = function (content = '') {
  const textareaDiv = document.createElement('section');
  const textarea = document.createElement('textarea');
  textarea.setAttribute('placeholder', '내용을 적어주세요.');
  const contentText = document.createTextNode(content);
  textarea.appendChild(contentText);
  textarea.className = 'Todo-contentInput';
  textareaDiv.appendChild(textarea);
  return textareaDiv;
};
export { Button, SendButton, Input, Textarea };
