import React, { useState, useEffect } from 'react';
import './Erreur.css';

const Erreur = () => {

    const [darkMode] = useState(localStorage.getItem('darkMode') === 'true');

   useEffect(() => {
     if (darkMode) {
       document.body.classList.add('dark-mode');
     } else {
       document.body.classList.remove('dark-mode');
     }
 
     localStorage.setItem('darkMode', darkMode);
   }, [darkMode]);

    let ErrorAnimate = [
        "",
        "E",
        "Er",
        "Err",
        "Erre",
        "Erreu",
        "Erreur",
        "Erreur4",
        "Erreur40",
        "Erreur404",
        "eRreur404",
        "erReur404",
        "errEur404",
        "erreUr404",
        "erreuR404",
        "erreur004",
        "erreur0-4",
        "erreur0-0",
        "erreur0-0",
        "erreur0-0",
        "erreur0-4",
        "erreur004",
        "erreur404",
        "erreuR400",
        "erreUr404",
        "errEur404",
        "erReur404",
        "eRreur404",
        "Erreur404",
        "Erreur40",
        "Erreur4",
        "Erreur",
        "Erreu",
        "Erre",
        "Err",
        "Er",
        "E",
        "",
      ]

        let urlAnimate = () => {
            window.location.hash =
                ErrorAnimate[Math.floor((Date.now() / 1000) % ErrorAnimate.length)];
                setTimeout(urlAnimate, 10);
        };

        urlAnimate();

        document.body.style.overflow = 'hidden';
        

    return (
        <div>
        <h1 className='Err404'>Erreur 4👀4</h1>
        <p className='ErreuretOui'>La page demandée N'EXISTE PAS !!!</p>
        <p className='ErreurLol'>¯\_(ツ)_/¯</p>
        <button className='ErreurButton' onClick={() => window.location.href = '/'}>Retourner à l'accueil</button>
        </div>
    );
}

export default Erreur;