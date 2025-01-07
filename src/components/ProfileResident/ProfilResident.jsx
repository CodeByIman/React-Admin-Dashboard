import React, { useEffect, useState } from "react";
import axios from "axios";

const ProfilResident = () => {
  const [resident, setResident] = useState(null);

  useEffect(() => {
    const residentData = localStorage.getItem("resident");
    if (residentData) {
      setResident(JSON.parse(residentData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("resident");
    window.location.href = "/login";
  };

  if (!resident) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Profil de Résident</h2>
      <p>Nom : {resident.name}</p>
      <p>Email : {resident.email}</p>
      <p>Chambre ID : {resident.chambreId}</p>
      <button onClick={handleLogout}>Se déconnecter</button>
    </div>
  );
};

export default ProfilResident;
