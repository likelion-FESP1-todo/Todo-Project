// 뒤로가기 버튼
const BackButton = function () {
  const backBtn = document.createElement("button");
  const backIcon = document.createElement("img");
  backIcon.src = "/assets/img/backButton.svg";
  backIcon.alt = "뒤로가기";
  backBtn.appendChild(backIcon);
  backBtn.addEventListener("click", () => {
    window.history.back();
  });

  return backBtn;
};

export { BackButton };
