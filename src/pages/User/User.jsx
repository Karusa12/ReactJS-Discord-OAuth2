import React, { useEffect, useState } from 'react';
import NavBarLog from "../../components/Navbar/NavBarLog";
import axios from 'axios';
import './UserCard.css';
import './GuildCard.css';
import NavBarLoad from '../../components/Navbar/NavBarLoad';
import Footer from '../../components/Footer/Footer'
import '../../components/Navbar/NavBarDarkMode.css'

const Card = ({ title, content }) => {
  return (
    <div className="UserCard__section">
      <div className="UserCard__section__title">{title}</div>
      <div className="UserCard__section__content">
        {content.map((item) => (
          <div className="UserCard__section__content__item" key={item.label}>
            <div className="UserCard__section__content__item__label">{item.label}</div>
            <div className="UserCard__section__content__item__value">{item.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

const CardServer = ({ selectedServer, title, content }) => {
  return (
    <div className="ServerCard"> 
      <div className="ServerCard__header">
        <img className="ServerCard__avatar" src={`https://cdn.discordapp.com/icons/${selectedServer.id}/${selectedServer.icon}.png`} alt="Server avatar" />
        <div className='ServerCard_name'>{selectedServer.name}</div>
      </div>
      <div className="ServerCard__section">
        <div className="ServerCard__section__title">{title}</div>
        <div className="ServerCard__section__content">
          {content.map((item) => (
            <div className="ServerCard__section__content__item" key={item.label}>
              <div className="ServerCard__section__content__item__label">{item.label}</div>
              <div className="ServerCard__section__content__item__value">{item.value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const User = () => {
  const [user, setUser] = useState(null);
  const [servers, setServers] = useState([]);
  const [selectedServer, setSelectedServer] = useState(null);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      window.location.href = '/';
      return; 
    }

    const fetchUserData = async () => {
      try {
        const response = await axios.get('https://discord.com/api/users/@me', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        setUser(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des informations de l\'utilisateur:', error);
      }
    };

    const fetchServerData = async () => {
      try {
        const response = await axios.get('https://discord.com/api/users/@me/guilds', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        setServers(response.data);
        if (response.data.length > 0) {
          setSelectedServer(response.data[0]); 
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des informations de l\'utilisateur:', error);
      }
    };

    fetchServerData();
    fetchUserData();
  }, []); 

  console.log(user);

  const handleServerChange = (event) => {
    const selectedServerId = event.target.value;
    const selectedServer = servers.find((server) => server.id === selectedServerId);
    setSelectedServer(selectedServer);
  };

  return (
    <div>
      {user && servers.length > 0 ? (
        <div>
          <NavBarLog />
          <br />
          <div className="UserCard">
            <div className="UserCard__header">
              <img className="UserCard__avatar" src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`} alt="User avatar" />

              <div className="UserCard__username">{user.global_name}</div>
            </div>
            <Card
              title='Informations'
              content={[
                { label: 'ID', value: user.id },
                { label: 'Nom', value: user.global_name},
                { label: 'Nom d\'utilisateur', value: user.username},
                { label: 'D\'iscriminateur', value: `#${user.discriminator}`},
                { label: 'Double Auth', value: user.mfa_enabled ? 'Oui' : 'Non'},
                { label: 'Couleur bannière', value: user.banner_color },
                { label: 'Email', value: user.email},
              ]}
            />
          </div>
          <br />
          <div className="ServerCard">
            <h2>Sélectionner un serveur</h2>
            <select className="ServerCard__select" onChange={handleServerChange}>
              {servers.map((server) => (
                <option key={server.id} value={server.id}>
                  {server.name}
                </option>
              ))}
            </select>
            <br />
            {selectedServer && (
              <CardServer
                selectedServer={selectedServer}
                title='Informations serveur'
                content={[
                  { label: 'ID', value: selectedServer.id},
                  { label: 'Nom', value: selectedServer.name},
                  { label: 'Owner', value: selectedServer.owner ? 'Oui' : 'Non'},
                  { label: 'Permissions', value: <a href={`https://discordapi.com/permissions.html#${selectedServer.permissions}`}>{selectedServer.permissions}</a> },
                  
                ]}
              />
            )}
          </div>
          <br />
          <button className="ServerCard__button" onClick={() => window.location.href = '/stats'}>Statistiques</button>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <Footer />
        </div>
      ) : (
        <div>
          <NavBarLoad />
          <div className='Loading'>
            <h1>Chargement des informations de l'utilisateur...</h1>
          </div>
          <Footer />
        </div>
      )}
    </div>
  );
};

export default User;
