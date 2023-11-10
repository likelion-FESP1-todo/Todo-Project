import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../Layout/Footer';
import Header from '../../Layout/Header';

const TodoList = function () {
  return (
    <div id="page">
      <Header title="할일 목록 페이지" />
      <Footer />
    </div>
  );
};

export default TodoList;
