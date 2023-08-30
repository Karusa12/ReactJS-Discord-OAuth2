import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavBarLog from '../../components/Navbar/NavBarLog';
import NavBarLoading from '../../components/Navbar/NavBarLoad';
import './LivingRoom.css';

import { TypeAnimation } from 'react-type-animation';

const formatDate = (dateString) => {
    const options = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        timeZone: 'UTC'
    };

    const formattedDate = new Date(dateString).toLocaleDateString(undefined, options);
    return formattedDate;
};

const LivingRoom = () => {
    const [data, setData] = useState(null);
    const [user, setUser] = useState(null);
    const [guildMembersRead, setGuildMembersRead] = useState(null);
    const [serverRoles, setServerRoles] = useState(null);
    const [RoleMemberAll, setRoleMemberAll] = useState(null);

    console.log(data);
    console.log(user);
    console.log(guildMembersRead);
    console.log(serverRoles);
    console.log(RoleMemberAll);

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');

        if (!accessToken) {
            window.location.href = '/rules';
            return; 
        }

        const fetchUserData = async () => {
            try {
                const response = await axios.get('https://discord.com/api/users/@me', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });

                setData(response.data);
            } catch (error) {
                console.log(error);
            }
        }

        fetchUserData();

        const fetchGuildData = async () => {
            try {
                const response = await axios.get('https://discord.com/api/users/@me/guilds', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });

                setUser(response.data);
            } catch (error) {
                console.log(error);
            }
        }

        fetchGuildData();
        
        const fetchGuildMembersRead = async () => {
            const GuildID = '759830892595249153';
            try {
                const response = await axios.get(`https://discord.com/api/v10/users/@me/guilds/${GuildID}/member`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });

                setGuildMembersRead(response.data);
                
            } catch (error) {
                console.log(error);
            }
        }
        
        fetchGuildMembersRead();

        const fetchServerRoles = async () => {
            try {
                const response = await axios.get(`https://backend.karusa.fr/livingroom/roles`)

                localStorage.setItem('serverRoles', JSON.stringify(response.data));

                setServerRoles(response.data);
                
            } catch (error) {
                console.log(error);
            }
        }

        fetchServerRoles();

    }, [user]);

    useEffect(() => {
        if (guildMembersRead && guildMembersRead.roles && serverRoles) {
            const userRoleIds = guildMembersRead.roles.map((roleId) => roleId);
            
            const userRoles = userRoleIds.map((roleId) => {
                const role = serverRoles.find((serverRole) => serverRole.id === roleId);
                if (role) {
                    return {
                        id: role.id,
                        name: role.name,
                        color: role.color,
                        position: role.position
                    };
                }
                return null;
            }).filter(Boolean);
    
            userRoles.sort((a, b) => b.position - a.position);
            
            setRoleMemberAll(userRoles);
        }
    }, [guildMembersRead, serverRoles]);
    
    
    useEffect(() => {
        const refreshPage = () => {
            window.location.reload(); 
        };
    
        const intervalId = setInterval(() => {
            if (!user || !data || !guildMembersRead) {
                refreshPage();
            }
        }, 20000); 
    
        return () => {
            clearInterval(intervalId);
        };
    }, [user, data, guildMembersRead]);

    return (
        <div>
            {user && data && guildMembersRead ? (
                <div>
                    <NavBarLog />
                    <br />
                    <br />
                    <br />
                    <div className='CardUserLiving'>
                        <img className='UserAvatar' src={`https://cdn.discordapp.com/avatars/${data.id}/${data.avatar}.png`} alt="/" />
                        <h2>{data.global_name}</h2>
                        <h2>{data.username}#{data.discriminator}</h2>
                        <br className='phone' />
                        <h2>Rejoint le serveur le {formatDate(guildMembersRead.joined_at)}</h2>
                        {guildMembersRead.premium_since ? (
                            <h2>Booster depuis {formatDate(guildMembersRead.premium_since)}</h2>
                        ) : (
                            <h2>Non booster</h2>
                        )}
                        <h2>Rôles</h2>
                        <div className='DiscordRoleList'>
                        {RoleMemberAll && RoleMemberAll.map((role) => (
                                <div key={role.id} className='DiscordRole'>
                                    <div className='RoleCircle' style={{ backgroundColor: `#${role.color.toString(16)}` }}></div>
                                    <div className='RoleName'>{role.name}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <br />
                    <br />
                    <br />
                </div>        
            ) : (
                <div>
                    <NavBarLoading />
                    <div className='Chargement'>
                    <TypeAnimation
                        sequence={[
                        'Redirection en cours ...',
                        1000, 
                        'Chargement des données rôles du serveur Living Room',
                        1000,
                        'Chargement des données utilisateur du serveur Living Room',
                        1000,
                        'Chargement des données de l\'OAuth2 Discord',
                        1000,
                        'Cela peut prendre quelques secondes ...',
                        1000,
                        ]}
                        wrapper="span"
                        speed={50}

                        style={{ fontSize: '2em', display: 'inline-block', fontWeight: 'bold'}}
                        repeat={Infinity}/>
                        <br className='phone' />
                        <br className='phone' />
                        <br className='phone' />
                        <br className='phone' />
                        <br className='phone' />
                        <p className='ChargementP'>Vous êtes sur le serveur LivingRoom, cette page vous redirigeras vers votre carte membre !</p>
                    </div>
                </div>
            )}
        </div>
    )
}

export default LivingRoom;