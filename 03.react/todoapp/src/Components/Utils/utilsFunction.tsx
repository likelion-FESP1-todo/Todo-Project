import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// 게시물 삭제
export const useDeleteEvent = function () {
  const navigate = useNavigate();

  return async function (id: number) {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      try {
        await axios.delete(`http://localhost:33088/api/todolist/${id}`);
        alert('삭제 완료');
        navigate('/');
      } catch (err) {
        alert('삭제 실패');
        console.error(err);
      }
    }
  };
};

// 뒤로가기
export const useBackEvent = function () {
  const navigate = useNavigate();

  return function () {
    navigate(-1);
  };
};

// Input 유효성 검사
export const IsValidateInput = function (titleVal: string, contentVal: string) {
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
