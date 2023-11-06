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

const IsValidateInput = function (titleVal: string, contentVal: string) {
  if (titleVal.length >= 50) {
    alert('50자 미만으로 입력해주세요.');
    return false;
  }
  if (!titleVal || !contentVal) {
    alert('제목과 상세내용을 모두 입력해주세요!');
    return false;
  }
  return true;
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
export { Input, IsValidateInput, Textarea };
