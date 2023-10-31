// 뒤로가기 버튼
const BackButton = function () {
  const backBtn = document.createElement('button');
  const backBtnText = document.createTextNode('뒤로가기');
  backBtn.appendChild(backBtnText);
  backBtn.className = 'move_datail';
  backBtn.addEventListener('click', () => {
    window.history.back();
  });

  return backBtn;
};

export { BackButton };
