import React, { useEffect, useState } from "react";
import "./Cards.css";
import { cardsData } from "../../Data/Data";
import Card from "../Card/Card";
import axios from "axios";

const Cards = () => {
  const [stats, setStats] = useState({
    tauxOccupation: 0,
    chambresDisponibles: 0,
    capaciteHebergement: 0,
  });

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/chambres/statistics");
        console.log("Response Data:", response.data);
       

        setStats(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des statistiques", error);
      }
    };

    fetchStatistics();
  }, []);

  return (
    <div className="Cards">
      {cardsData.map((card, id) => {
        let barValue;
        let value;

        switch (card.title) {
          case "Taux occupation":
            value = `${stats.tauxOccupation}%`;  // Utiliser des backticks pour l'interpolation
            break;
          case "Chambres disponibles":
            value = stats.chambresDisponibles;  // Pas besoin de convertir en chaîne si c'est un nombre
            break;
          case "Cpacité d'heberegement":
            barValue = stats.capaciteHebergement;
            value = stats.capaciteHebergement;
            break;
          default:
            barValue = card.barValue;
            value = card.value;
        }
        
        return (
          <div className="parentContainer" key={id}>
            <Card
              title={card.title}
              color={card.color}
              barValue={barValue}
              value={value}
              png={card.png}
              series={card.series}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Cards;
