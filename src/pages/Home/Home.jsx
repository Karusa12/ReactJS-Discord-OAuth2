// Home.js
import React from 'react';
import './Home.css';
import NavBar from '../../components/Navbar/NavBar';

import { TypeAnimation } from 'react-type-animation';

const Home = () => {

  const accessToken = localStorage.getItem('accessToken');
  if (accessToken) {
    window.location.href = '/user';
    return;
  }

  let myEmoji = [
    "😀",
    "😃",
    "😄",
    "😁",
    "😆",
    "😅",
    "😂",
    "🤣",
    "😊",
    "😇",
    "🙂",
    "🙃",
    "😉",
    "😌",
    "😍",
    "🥰",
    "😘",
    "😗",
    "😙",
    "😚",
    "😋",
    "😛",
    "😝",
    "😜",
    "🤪",
    "🤨",
    "🧐",
    "🤓",
    "😎",
    "🤩",
    "🥳",
    "😏",
    "😒",
    "😞",
    "😔",
    "😟",
  ]

  let urlAnimate = () => {
    window.location.hash =
      myEmoji[Math.floor((Date.now() / 1000) % myEmoji.length)];
      setTimeout(urlAnimate, 70);
  }; 

  urlAnimate();


  return (
    <div>
      <NavBar />
      <br />
      <br />
        <div className="Home__content">
        <TypeAnimation
        sequence={[
          'Panel pour gérer',
          1000, 
          'Panel pour administrer',
          1000,
          'Panel pour paramétrer',
          1000,
          'Panel pour le serveur discord Living Room',
          1000
        ]}
        wrapper="span"
        speed={50}

        style={{ fontSize: '2em', display: 'inline-block', fontWeight: 'bold', textAlign: 'center'}}
        repeat={Infinity}/>
        </div>
    </div>
  );
};

export default Home;