import React, { useEffect } from 'react';
import axios from 'axios';
import './Callback.css';
import NavbarLoad from '../../components/Navbar/NavBarLoad';

const Callback = () => {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    console.log(code)
    console.log('Code d\'autorisation:', code);

    const exchangeCodeForToken = async () => {
      try {
        const response = await axios.post('https://backend.karusa.fr/callback', { code });
        // Adresse de votre serveur Backend
        console.log('Réponse de l\'API Discord:', response.data);
        const accessToken = response.data.access_token;
        console.log('Token d\'accès:', accessToken);
        localStorage.setItem('accessToken', accessToken);
        window.location.href = '/user';
      } catch (error) {
        console.error('Erreur lors de l\'échange de code d\'autorisation:', error);
      }
    };    

    const storedAccessToken = localStorage.getItem('accessToken'); 
    if (storedAccessToken) { 
      window.location.href = '/user';
    } else { 
      exchangeCodeForToken(); 
    }
  }, []);

  return (
    <div>
      <NavbarLoad />
      <div className="redirection">
        <h1>Redirection après l'authentification...</h1>
      </div>
    </div>
  );
};

export default Callback;