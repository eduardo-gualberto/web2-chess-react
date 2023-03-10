import React from 'react';
import logo from './logo.svg';
import './App.css';
import HomeScene from './scenes/HomeScene/HomeScene';
import Header from './common/components/Header/Header';
import Layout from './common/components/Layout/Layout';
import PlayOnlineScene from './scenes/PlayOnlineScene/PlayOnlineScene';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PlayOnlineChessBoardScene from './scenes/PlayOnlineChessBoardScene/PlayOnlineChessBoardScene';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout header={<Header />} content={<HomeScene />} />} />
        <Route path="/online" element={<Layout header={<Header shouldShowBackIcon backIconPath='/' />} content={<PlayOnlineScene />} />} />
        <Route path="/onlineGame" element={<Layout header={<Header shouldShowBackIcon backIcon='home' backIconPath='/' />} content={<PlayOnlineChessBoardScene />} />} />
      </Routes>
    </Router>
  );
}

export default App;
