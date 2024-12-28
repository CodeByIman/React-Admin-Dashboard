import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8080/api/chambres/available';


export const listChambres = async () => {
    try {
      const response = await axios.get(REST_API_BASE_URL);
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la récupération des employés:", error);
      throw error; // Relancer l'erreur pour une gestion dans le composant appelant
    }
  };