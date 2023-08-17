import React, { useState, useEffect } from 'react';
import './NavBar.css';
import './NavBarDarkMode.css';

const NavBarLoading = () => {

   const [darkMode, setDarkMode] = useState(localStorage.getItem('darkMode') === 'true');

   const toggleDarkMode = () => {
     setDarkMode(prevMode => !prevMode);
   };
 
   useEffect(() => {
     if (darkMode) {
       document.body.classList.add('dark-mode');
     } else {
       document.body.classList.remove('dark-mode');
     }
 
     localStorage.setItem('darkMode', darkMode);
   }, [darkMode]);

  return (
    <div className="NavBarHome">
      <div className="NavBarHome__logo">KarusaDash</div>
      <div className="NavBarHome__links">
      <div className="NavBarHome__switch">
          <label className="switch">
            <input type="checkbox" checked={darkMode} onChange={toggleDarkMode} />
            <span className="slider round"></span>
          </label>
        </div>
        <a className="NavBarHome__button_loading" href="/">Chargement</a>
      </div>
    </div>
  );
};


export default NavBarLoading;