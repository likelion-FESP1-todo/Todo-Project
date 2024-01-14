import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TodoInfo from './Pages/TodoInfo/TodoInfo';
import TodoList from './Pages/TodoList/TodoList';
import TodoRegist from './Pages/TodoRegist/TodoRegist';
import TodoUpdate from './Pages/TodoUpdate/TodoUpdate';

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<TodoList />}
        />
        <Route
          path="/info"
          element={<TodoInfo />}
        />
        <Route
          path="/regist"
          element={<TodoRegist />}
        />
        <Route
          path="/update"
          element={<TodoUpdate />}
        />
      </Routes>
    </Router>
  );
}

export default App;
