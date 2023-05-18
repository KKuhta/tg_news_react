import './App.css';
import React from 'react';

import Profile from './pages/Profile';
import { Route, Routes } from 'react-router-dom';
import './scss/app.scss';
import Auth from './components/Auth';
import Checking from './components/Checking';
import Bxod from './components/Bxod';

function App() {
  return (
    <div className="background">
      <div>
        <Routes>
          <Route path="/" element={<Checking />} />
          <Route path="/Bxod" element={<Bxod />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
