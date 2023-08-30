import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const MessageStaffStats = () => {
    const [statsData, setStatsData] = useState(null);
    const [statsDataBefore, setStatsDataBefore] = useState(null);
    const [user, setUser] = useState(null);
    const canvasRef = useRef(null);
    const chartInstanceRef = useRef(null);

    console.log(user)

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        
        const fetchUser = async () => {
            try {
                const response = await axios.get("https://discord.com/api/users/@me", {
                    headers: {
                        authorization: `Bearer ${accessToken}`
                    }
                });
                setUser(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des données', error);
            }
        }
        fetchUser();
    }, []);

    useEffect(() => {


        async function fetchData() { 

            const Aujourdhui = new Date();
            const PermierJourDeLaSemaine = new Date(Aujourdhui.setDate(Aujourdhui.getDate() - Aujourdhui.getDay() + (Aujourdhui.getDay() === 0 ? -6 : 1)));
            const DernierJourDeLaSeamine = new Date(Aujourdhui.setDate(Aujourdhui.getDate() - Aujourdhui.getDay() + 7));
            const PermierJourDeLaSemaineDernière = new Date(PermierJourDeLaSemaine);
            PermierJourDeLaSemaineDernière.setDate(PermierJourDeLaSemaineDernière.getDate() - 7);
            const DernierJourDeLaSeamineDernière = new Date(DernierJourDeLaSeamine);
            DernierJourDeLaSeamineDernière.setDate(DernierJourDeLaSeamineDernière.getDate() - 7);
            const PerSemaine = PermierJourDeLaSemaine.toLocaleDateString('fr-FR')
            const DerSemaine = DernierJourDeLaSeamine.toLocaleDateString('fr-FR')
            const PerSemaineDernière = PermierJourDeLaSemaineDernière.toLocaleDateString('fr-FR')
            const DerSemaineDernière = DernierJourDeLaSeamineDernière.toLocaleDateString('fr-FR')

            try {

                const response = await axios.post("https://backend.karusa.fr/stats/messagestaff");

                const StatsSemaine = response.data.filter((stat) => stat.DébutSemaine === PerSemaine && stat.FinSemaine === DerSemaine);
                const StatsSemaineAvant = response.data.filter((stat) => stat.DébutSemaine === PerSemaineDernière && stat.FinSemaine === DerSemaineDernière);

                if (user) {

                    const memberStatsSemaine = StatsSemaine.find((stat) => stat.Members && stat.Members.some(member => member.id === user.id));
                    const memberStatsSemaineAvant = StatsSemaineAvant.find((stat) => stat.Members && stat.Members.some(member => member.id === user.id));

                    setStatsData(memberStatsSemaine);
                    setStatsDataBefore(memberStatsSemaineAvant);

                }

            } catch (error) {
                console.error('Erreur lors de la récupération des données', error);
            }
        }
        fetchData();
    }, [user]);

    useEffect(() => {

        if (!statsDataBefore) {

            if(statsData) {
                if(chartInstanceRef.current) {
                    chartInstanceRef.current.destroy();
                }

                const userStatsThisWeek = statsData.Members.find(member => member.id === user.id);

                const ctx = canvasRef.current.getContext("2d");
                const chartInstance = new Chart(ctx, {
                    type: "bar",
                    data: {
                        labels: ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"],
                        datasets: [
                            {
                                label: "Messages envoyés cette semaine",
                                data: [userStatsThisWeek.Lundi, userStatsThisWeek.Mardi, userStatsThisWeek.Mercredi, userStatsThisWeek.Jeudi, userStatsThisWeek.Vendredi, userStatsThisWeek.Samedi, userStatsThisWeek.Dimanche],
                                backgroundColor: [
                                    '#ff6384'
                                ],
                                borderColor: [
                                    '#ff6384'
                                ],
                                borderWidth: 1,
                            },
                        ],
                    },
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true,
                            },
                        },
                    },
                });
                chartInstanceRef.current = chartInstance;
            }
        } else if (statsDataBefore) {
                
                if(chartInstanceRef.current) {
                    chartInstanceRef.current.destroy();
                }

                const userStatsThisWeek = statsData.Members.find(member => member.id === user.id);
                const userStatsLastWeek = statsDataBefore.Members.find(member => member.id === user.id);
    
                const ctx = canvasRef.current.getContext("2d");
                const chartInstance = new Chart(ctx, {
                    type: "bar",
                    data: {
                        labels: ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"],
                        datasets: [
                            {
                                label: "Messages envoyés cette semaine",
                                data: [userStatsThisWeek.Lundi, userStatsThisWeek.Mardi, userStatsThisWeek.Mercredi, userStatsThisWeek.Jeudi, userStatsThisWeek.Vendredi, userStatsThisWeek.Samedi, userStatsThisWeek.Dimanche],
                                backgroundColor: [
                                    '#ff6384'
                                ],
                                borderColor: [
                                    '#ff6384'
                                ],
                                borderWidth: 1,
                            },
                            {
                                label: "Messages envoyés la semaine dernière",
                                data: [userStatsLastWeek.Lundi, userStatsLastWeek.Mardi, userStatsLastWeek.Mercredi, userStatsLastWeek.Jeudi, userStatsLastWeek.Vendredi, userStatsLastWeek.Samedi, userStatsLastWeek.Dimanche],
                                backgroundColor: [
                                    '#36a2eb'
                                ],
                                borderColor: [
                                    '#36a2eb'
                                ],
                                borderWidth: 1,
                            },
                        ],
                    },
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true,
                            },
                        },
                    },
                });
                chartInstanceRef.current = chartInstance;
        }
    }

    , [statsData, statsDataBefore]);


    return (
        <div className="VocalStats">
            {statsData && statsDataBefore ? (
                <canvas id="myChart" ref={canvasRef}></canvas>
            ) : statsData ? (
                <canvas id="myChart" ref={canvasRef}></canvas>
            ) : (
                <p>Chargement des statistiques</p>
            )}
        </div>
    );
};    

export default MessageStaffStats;