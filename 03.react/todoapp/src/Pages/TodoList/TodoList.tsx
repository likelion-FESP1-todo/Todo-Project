import Footer from '../../Layout/Footer';
import Header from '../../Layout/Header';

const TodoList = function () {
  return (
    <div id="page">
      <Header
        title="할일 목록 페이지"
        className="Todo-header TodoInfo-header"
      />
      <Footer />
    </div>
  );
};

export default TodoList;
