import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// 게시물 삭제
const useDeleteEvent = function () {
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
const useBackEvent = function () {
  const navigate = useNavigate();

  return function () {
    navigate(-1);
  };
};

export { useDeleteEvent, useBackEvent };
