import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TodoInfo from './Pages/TodoInfo';
import TodoList from './Pages/TodoList';
import TodoRegist from './Pages/TodoRegist';
import TodoUpdate from './Pages/TodoUpdate';

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<TodoInfo />}
        />
        <Route
          path="/list"
          element={<TodoList />}
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
