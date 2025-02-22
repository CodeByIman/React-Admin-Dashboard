import React, { useState } from "react";
import "./Card.css";
import { motion } from "framer-motion";

// Parent Card
const Card = (props) => {
  // Check if percentage display is needed based on card title
  const noPercentageTitles = ["Taux occupation", "Chambres disponibles"];

  if (noPercentageTitles.includes(props.title)) {
    return <TextCard param={props} />;
  }

  return <CompactCard param={props} />;
};

// Compact Card
function CompactCard({ param }) {
  const Png = param.png;
  return (
    <motion.div
      className="CompactCard"
      style={{
        background: param.color.backGround,
        boxShadow: param.color.boxShadow,
      }}
      layoutId="statisticCard"
    >
      <div className="detail">
        <Png />
        <span>{param.title}</span>
        <h1>{param.barValue}</h1> {/* Display barValue as text */}
      </div>
    </motion.div>
  );
}

// Text Card for non-percentage display
function TextCard({ param }) {
  console.log("TextCard props:", param); // Vérifiez les props
  const Png = param.png;
  return (
    <motion.div
      className="CompactCard"
      style={{
        background: param.color.backGround,
        boxShadow: param.color.boxShadow,
      }}
      layoutId="statisticCard"
    >
      <div className="detail">
        <Png />
        <span>{param.title}</span>
        <h1>{param.value}</h1>
      </div>
    </motion.div>
  );
}

export default Card;