import './App.css';
import React from 'react';

import Profile from './pages/Profile';
import { Route, Routes } from 'react-router-dom';
import './scss/app.scss';
import Auth from './components/Auth';

function App() {
  return (
    <div className="background">
      <div>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
