const BackEvent = function () {
  window.history.back();
};

const DeleteEvent = async function (_id) {
  if (window.confirm('정말 삭제하시겠습니까?')) {
    try {
      await axios.delete(`http://localhost:33088/api/todolist/${_id}`);
      alert('삭제 완료');
      linkTo('/');
    } catch (err) {
      alert('삭제 실패');
      console.error(err);
    }
  }
};

const IsValidateInput = function (titleVal, contentVal) {
  if (titleVal.length >= 50) {
    alert('50자 미만으로 입력해주세요.');
    titleVal = titleInput.value.substring(0, 50);
    return false;
  }
  if (!titleVal || !contentVal) {
    alert('제목과 상세내용을 모두 입력해주세요!');
    return false;
  }
  return true;
};

export { BackEvent, DeleteEvent, IsValidateInput };
