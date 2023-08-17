import React, { useEffect, useState } from 'react';
import axios from "axios";
import NavBarLoading from '../../components/Navbar/NavBarLoad';
import './Redirection.css';

const Redirection = () => {
  const [secondsRemaining, setSecondsRemaining] = useState(5);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    const exchangeCodeForToken = async () => {
      try {
        const response = await axios.post('http://localhost:3600/redirection', { code });
        const accessToken = response.data.access_token;
        localStorage.setItem('accessToken', accessToken);
        
        setTimeout(() => {
          window.location.href = '/LivingRoom';
        }, 5000);
      } catch (error) {
        console.error('Erreur lors de l\'échange de code d\'autorisation:', error);
      }
    };

    const storedAccessToken = localStorage.getItem('accessToken');
    if (storedAccessToken) {
      setTimeout(() => {
        window.location.href = '/LivingRoom';
      }, 5000);
    } else {
      exchangeCodeForToken();

      const countdownInterval = setInterval(() => {
        setSecondsRemaining(prevSeconds => {
          if (prevSeconds > 1) {
            return prevSeconds - 1;
          } else {

            clearInterval(countdownInterval);
            window.location.href = '/LivingRoom';
            return prevSeconds;
          }
        });
      }, 1000);

      return () => {
        clearInterval(countdownInterval);
      };
    }
  }, []);

  return (
    <div>
      <div className="redirection">
        <NavBarLoading />
        <div className='Redirect'>
          <h1>Redirection après l'authentification...</h1>
          <p>Redirection dans {secondsRemaining} seconde{secondsRemaining !== 1 ? 's' : ''}</p>
        </div>
      </div>
    </div>
  );
};

export default Redirection;
