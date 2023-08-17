import React, { useState } from "react";
import NavBar from "../../components/Navbar/NavBar";
import NavBarLog from "../../components/Navbar/NavBarLog";
import MessageStats from "../../components/Statistical/Message";
import VocalStats from "../../components/Statistical/Vocal";
import VocalStaffStats from "../../components/Statistical/VocalStaff";
import MessageStaffStats from "../../components/Statistical/MessageStaff";
import { Chart, registerables } from "chart.js";
import './Stats.css'

Chart.register(...registerables);

const Stats = () => {
    const [accessToken] = useState(localStorage.getItem("accessToken"));
    const [isGlobalStats, setIsGlobalStats] = useState(true);
    
    return (
        <div>
            {accessToken ? <NavBarLog /> : <NavBar />}
            <br className="phone-br"/>
            <div className="stats-buttons">
                <button onClick={() => setIsGlobalStats(true)}>Statistiques Globales</button>
                <div className="button-space"></div>
                <button onClick={() => setIsGlobalStats(false)}>Statistiques Personnelles</button>
            </div>
            <div className="chart-container">
                {isGlobalStats ? (
                    <div>
                        <MessageStats />
                        <VocalStats />
                        <br />
                        <br />
                        <br />
                    </div>
                ) : (
                    accessToken ? (
                        <div>
                            <MessageStaffStats />
                            <VocalStaffStats />
                            <br />
                            <br />
                            <br />
                        </div>
                    ) : (
                        <div>
                            <h1>Vous devez être connecté pour voir vos statistiques personnelles</h1>
                        </div>
                    )
                )}
            </div>
        </div>
    );  
}

export default Stats;
