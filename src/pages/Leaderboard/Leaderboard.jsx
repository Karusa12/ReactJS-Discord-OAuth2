import React, { useState, useEffect } from "react";
import "./Leaderboard.css";
import axios from "axios";
import NavBarLog from "../../components/Navbar/NavBarLog";
import NavBar from "../../components/Navbar/NavBar";

const Leaderboard = () => {
    const [data, setData] = useState(null);
    const [user, setUser] = useState(null);
    const [leaderboardData, setLeaderboardData] = useState(null);

    console.log(user);

    const accessToken = localStorage.getItem('accessToken');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post('https://backend.karusa.fr/leaderboard/level');
                setData(response.data);
            } catch (error) {
                console.log(error);
            }
        }

        const fetchUserData = async () => {
            try {
                const response = await axios.post('https://backend.karusa.fr/leaderboard/memberlist');
                setUser(response.data);
            } catch (error) {
                console.log(error);
            }
        }

        fetchData();
        fetchUserData();
    }, []);

    useEffect(() => {
        if (data && user) {
            const leaderboardData = data.map(d => {
                let global_name = 'N/A';
                let avatar = 'N/A';
                for (let i = 0; i < user.length; i++) {
                    if (user[i].user.id === d.Member) {
                        global_name = user[i].user.global_name;
                        avatar = user[i].user.avatar;
                        break;
                    }
                }
                return {
                    id: d.Member,
                    xp: d.XP.toFixed(2),
                    level: d.Level,
                    global_name: global_name,
                    avatar: avatar,
                };
            }).sort((a, b) => b.xp - a.xp).filter(item => item.global_name !== 'N/A');
            
            setLeaderboardData(leaderboardData);
        }
    }, [data, user]);
    
    console.log(leaderboardData);

    return (
        <div>
          {accessToken ? <NavBarLog /> : <NavBar />}
          {user && data ? (
            <div>
              <h1 className="h1-leaderboard">Leaderboard BETA</h1>
              <div className="leaderboard">
                <div className="leaderboard-container">
                  <div className="leaderboard-header">
                    <div className="leaderboard-header-rank">#</div>
                    <div className="leaderboard-header-avatar">Avatar</div>
                    <div className="leaderboard-header-name">Name</div>
                    <div className="leaderboard-header-level">Level</div>
                    <div className="leaderboard-header-xp">XP</div>
                  </div>
                  <br />
                  <div className="leaderboard-body">
                    {leaderboardData &&
                      leaderboardData.map((data, index) => {
                        return (
                          <div className="leaderboard-body-row" key={index}>
                            <div className="leaderboard-body-rank">{index + 1}</div>
                            <div className="leaderboard-body-avatar">
                              <img
                                src={`https://cdn.discordapp.com/avatars/${data.id}/${data.avatar}.png`}
                                alt="avatar"
                              />
                            </div>
                            <div className="leaderboard-body-name">
                              {data.global_name}
                            </div>
                            <div className="leaderboard-body-level">{data.level}</div>
                            <div className="leaderboard-body-xp">{data.xp}</div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div>
                <br />
                <br />
                <h1 className="loading">Loading...</h1>
            </div>
            
          )}
          <br />
        </div>
      );
}

export default Leaderboard;
