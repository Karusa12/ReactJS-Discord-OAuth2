import React, { useState, useEffect } from 'react';
import './NavBar.css';
import './NavBarDarkMode.css';

const NavBar = () => {
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
    <div className={`NavBarHome ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      <div className="NavBarHome__logo">KarusaDash</div>
      <div className="NavBarHome__links">
        <div className="NavBarHome__switch">
          <label className="switch">
            <input type="checkbox" checked={darkMode} onChange={toggleDarkMode} />
            <span className="slider round"></span>
          </label>
        </div>
        {/* Sur le site https://discord.com/developers/ vous devrez créer une application et renseigner une url de redirection */}
        {/* Dans notre cas, vous devez mettre une url de redirection (http://localhost:{portdevotreprojetreact}/callback) */}
        {/* URL Générator vous mettez identify guilds email guilds.join guilds.members.read */}
        {/* <a className="NavBarHome__button" href="https://discord.com/api/oauth2/authorize?client_id={CLIENTID}&redirect_uri=http%3A%2F%2Flocalhost%3A{PORTPROJETREACT}%2Fcallback&response_type=code&scope=identify%20guilds%20email%20guilds.join%20guilds.members.read">Connexion Discord</a> */}
        <a className="NavBarHome__button" href='https://discord.com/api/oauth2/authorize?client_id=777992628045611072&redirect_uri=http%3A%2F%2Flocalhost%3A3500%2Fcallback&response_type=code&scope=identify%20guilds%20guilds.join%20email%20guilds.members.read'>Connexion a Discord</a>
      </div>
    </div>
  );
};

export default NavBar;
