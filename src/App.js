import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Callback from './pages/Callback/Callback';
import User from './pages/User/User';
import Erreur from './pages/Erreur/Erreur';
import DownloadPage from './pages/DownloadPage/DownloadPage';
import Stats from './pages/Stats/Stats';
import Rules from './pages/Rules/Rules';
import Redirection from './pages/Redirection/Redirection';
import LivingRoom from './pages/LivingRoom/LivingRoom';
import Leaderboard from './pages/Leaderboard/Leaderboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/user" element={<User />} />
        <Route path="/callback" element={<Callback />} />
        <Route path="/redirection/" element={<Redirection />} />
        <Route path="/download/:softwareName" element={<DownloadPage />} />
        <Route path="/*" element={<Erreur />} />
        <Route exact path="/stats" element={<Stats />} />
        <Route exact path="/rules" element={<Rules />} />
        <Route exact path="/LivingRoom" element={<LivingRoom />} />
        <Route exact path="/Leaderboard" element={<Leaderboard />} />
      </Routes>
    </Router>
  );
}

export default App;

