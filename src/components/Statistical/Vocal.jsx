import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const VocalStats = () => {
    const [statsData, setStatsData] = useState(null);
    const [statsDataBefore, setStatsDataBefore] = useState(null);
    const canvasRef = useRef(null);
    const chartInstanceRef = useRef(null);

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

                const response = await axios.post("http://localhost:3600/stats/vocal");

                const StatsSemaine = response.data.filter((stat) => stat.DébutSemaine === PerSemaine && stat.FinSemaine === DerSemaine);
                const StatsSemaineAvant = response.data.filter((stat) => stat.DébutSemaine === PerSemaineDernière && stat.FinSemaine === DerSemaineDernière);

                setStatsData(StatsSemaine)
                setStatsDataBefore(StatsSemaineAvant)

            } catch (error) {
                console.error('Erreur lors de la récupération des données', error);
            }
        }
        fetchData();
    }, []); 

    useEffect(() => {
        if (statsData !== null && statsDataBefore !== null && canvasRef.current) {
            const ctx = canvasRef.current.getContext("2d");
            
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
            }

            chartInstanceRef.current = new Chart(ctx, {
                type: "bar",
                data: {
                    labels: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'],
                    datasets: [
                        {
                            label: 'Temps vocal dans la semaine (en seconde)',
                            data: [statsData[0].Lundi, statsData[0].Mardi, statsData[0].Mercredi, statsData[0].Jeudi, statsData[0].Vendredi, statsData[0].Samedi, statsData[0].Dimanche],
                            backgroundColor: [
                                '#ff6384'
                            ],
                            borderColor: [
                                '#ff6384'
                            ],
                            borderWidth: 1
                        },
                        {
                            label: 'Temps vocal dans la semaine précédente (en seconde)',
                            data: [statsDataBefore[0].Lundi, statsDataBefore[0].Mardi, statsDataBefore[0].Mercredi, statsDataBefore[0].Jeudi, statsDataBefore[0].Vendredi, statsDataBefore[0].Samedi, statsDataBefore[0].Dimanche],
                            backgroundColor: [
                                '#36a2eb'
                            ],
                            borderColor: [
                                '#36a2eb'
                            ],
                            borderWidth: 1
                        }
                    ]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        }
    }, [statsData, statsDataBefore]);

    return (
        <div className="VocalStats">
            <canvas id="myChart" ref={canvasRef}></canvas>
        </div>
    );  
}

export default VocalStats;