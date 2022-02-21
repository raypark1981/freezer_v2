import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Freezer from './components/freezer/freezer';
import Login from './components/login/login';

const App = ({ authService }) => {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Login authService={authService}/>} />
        <Route path="/freezer" element={<Freezer authService={authService}/>} />
      </Routes>
    </div>
  );
}

export default App;
