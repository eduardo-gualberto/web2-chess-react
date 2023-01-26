import React from 'react';
import logo from './logo.svg';
import './App.css';
import HomeScene from './scenes/HomeScene/HomeScene';
import Header from './utils/components/Header/Header';
import Layout from './utils/components/Layout/Layout';
import PlayOnlineScene from './scenes/PlayOnlineScene/PlayOnlineScene';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout header={<Header />} content={<HomeScene />} />} />
        <Route path="/online" element={<Layout header={<Header />} content={<PlayOnlineScene />} />} />
      </Routes>
    </Router>
  );
}

export default App;
