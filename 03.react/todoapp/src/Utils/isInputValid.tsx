// Input 유효성 검사
export const isInputValid = function (titleVal: string, contentVal: string) {
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

export default isInputValid;
