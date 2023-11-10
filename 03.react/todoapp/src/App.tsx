import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TodoInfo from './Pages/TodoInfo/TodoInfo';
import TodoList from './Pages/TodoList/TodoList';
import TodoRegist from './Pages/TodoRegist/TodoRegist';
import TodoUpdate from './Pages/TodoUpdate/TodoUpdate';

function App() {
  return (
    <div id="app">
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
    </div>
  );
}

export default App;
