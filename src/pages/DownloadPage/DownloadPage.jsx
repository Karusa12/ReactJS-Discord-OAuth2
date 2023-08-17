import React, { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring'; 
import NavBarLog from '../../components/Navbar/NavBarLog';
import NavBar from '../../components/Navbar/NavBar';
import Footer from '../../components/Footer/Footer';
import './DownloadPage.css';
import axios from 'axios';

const DownloadPage = () => {
  const [fileExists, setFileExists] = useState(false);
  const [urlContent, setUrlContent] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [counter, setCounter] = useState(5);
  const [downloading, setDownloading] = useState(false); 

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const url = window.location.href;
    const content = url.split('/download/')[1];
    setUrlContent(content);
    setAccessToken(accessToken);

    const checkFileUrl = `https://backend.karusa.fr/download/${content}`;

    axios
      .get(checkFileUrl)
      .then(response => {
        if (response.status === 200) {
          setFileExists(true);
        }
      })
      .catch(error => {
        if (error.response && error.response.status === 404) {
          setFileExists(false);
        }
      });
  }, []);

  // Animation de bouton
  const buttonAnimation = useSpring({
    opacity: downloading ? 0.5 : 1,
    pointerEvents: downloading ? 'none' : 'auto',
  });

  useEffect(() => {
    if (counter > 0 && fileExists) {
      const intervalId = setInterval(() => {
        setCounter(prevCounter => prevCounter - 1);
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [counter, fileExists]);

  const handleDownload = () => {
    setDownloading(true); 

    setTimeout(() => {
      setDownloading(false); 

      window.location.href = `https://localhost:3600/download/${urlContent}`;
    }, 2000);
  };

  return (
    <div>
      {accessToken ? <NavBarLog /> : <NavBar />}
      <div className="DownloadPage">
        <h1>{urlContent}</h1>
        {fileExists ? (
          <div>
            {counter > 0 ? (
              <p>Le téléchargement commence dans {counter} secondes...</p>
            ) : (
              <animated.button
                style={buttonAnimation}
                onClick={handleDownload}
              >
                {downloading ? 'Téléchargement en cours...' : 'Télécharger le fichier'}
              </animated.button>
            )}
          </div>
        ) : (
          <p>Le fichier n'existe pas.</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default DownloadPage;
