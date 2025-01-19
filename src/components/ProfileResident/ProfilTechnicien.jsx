import React, { useEffect, useState } from 'react';
import profiletech from "../../imgs/profiletech.png";
import backgoundtech from "../../imgs/backgoundtech.jpg";
import axios from 'axios';
import Button from '@mui/material/Button';

const ProfilTechnicien = () => {
  const [technicien, setTechnicien] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTechnicien, setUpdatedTechnicien] = useState({
    nomTechnicien: '',
    specialite: '',
    email: '',
    password: '',
    idTechnicien :'',
  });


  const [isModalOpen, setIsModalOpen] = useState(false);
const [selectedStatus, setSelectedStatus] = useState('');
const [currentIncidentId, setCurrentIncidentId] = useState(null);



  const [assignedIncidents, setAssignedIncidents] = useState([]);

  useEffect(() => {
    const technicienData = localStorage.getItem('technicien');
    if (technicienData) {
      const parsedData = JSON.parse(technicienData);
      setTechnicien(parsedData);
      setUpdatedTechnicien(parsedData);
      fetchAssignedIncidents(parsedData.idTechnicien);
    }
  }, []);

  const fetchAssignedIncidents = async (idTechnicien) => {
    if (!idTechnicien) {
      console.error("Technicien ID is not defined");
      return;
    }
    try {
      const response = await axios.get(`http://localhost:8080/api/incidents/technicien/${idTechnicien}`);
      setAssignedIncidents(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des incidents assignés", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedTechnicien({ ...updatedTechnicien, [name]: value });
  };

  const handleSaveChanges = async () => {
    try {
      await axios.put(`http://localhost:8080/api/techniciens/update/${technicien.idTechnicien}`, updatedTechnicien);
      alert("Profil modifié avec succès !");
      setTechnicien(updatedTechnicien);
      setIsEditing(false);
    } catch (error) {
      console.error("Erreur lors de la modification du profil", error);
      alert("Erreur lors de la modification du profil.");
    }
  };





  const openModal = (incidentId) => {
    setCurrentIncidentId(incidentId);
    setIsModalOpen(true);
  };
  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
  };
  const handleSubmitStatus = async () => {
    try {
      await axios.put(`http://localhost:8080/api/incidents/${currentIncidentId}/status`, { statut: selectedStatus });
      alert('Statut mis à jour avec succès !');
      setIsModalOpen(false);
      // Mettez à jour la liste des incidents assignés après la modification
      fetchAssignedIncidents(technicien.idTechnicien);
    } catch (error) {
      console.error('Erreur lors de la mise à jour du statut', error);
      alert('Erreur lors de la mise à jour du statut.');
    }
  };
      

  if (!technicien) {
    return <p>Chargement...</p>;
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen p-4 transition-colors duration-200">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-colors duration-200">
          <div className="relative h-48">
            <img src={backgoundtech} alt="Cover" className="w-full h-full object-cover" />
            <div className="absolute -bottom-12 left-6">
              <img src={profiletech} alt="Profile" className="w-24 h-24 rounded-xl object-cover border-4 border-white dark:border-gray-800 shadow-lg" />
            </div>
          </div>

          <div className="pt-16 px-6 pb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {technicien.nomTechnicien}
                </h1>
                <p className="text-purple-600 dark:text-purple-400">
                  specialté : {technicien.specialite}
                  {technicien.idTechnicien ? (
  <p>ID : {technicien.idTechnicien}</p>
) : (
  <p>ID non disponible</p>
)}

                </p>
                {isEditing && (
                  <>
                    <input
                      type="text"
                      name="nomTechnicien"
                      value={updatedTechnicien.nomTechnicien}
                      onChange={handleInputChange}
                      className="w-full mt-2 p-2 rounded bg-gray-100 dark:bg-gray-700 dark:text-white"
                    />
                    <input
                      type="text"
                      name="specialite"
                      value={updatedTechnicien.specialite}
                      onChange={handleInputChange}
                      className="w-full mt-2 p-2 rounded bg-gray-100 dark:bg-gray-700 dark:text-white"
                    />
                  </>
                )}
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={() => setIsEditing(!isEditing)}
                  variant="contained"
                  color="primary"
                >
                  {isEditing ? 'Annuler' : 'Modifier vos infos'}
                </Button>
                {isEditing && (
                  <Button
                    onClick={handleSaveChanges}
                    variant="contained"
                    color="secondary"
                  >
                    Enregistrer
                  </Button>
                )}
              </div>
            </div>

            <div className="mt-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Informations de contact
              </h2>
              <p>Email : <a href={`mailto:${technicien.email}`} className="text-purple-600 dark:text-purple-400 hover:underline">{technicien.email}</a></p>
              {isEditing && (
                <input
                  type="email"
                  name="email"
                  value={updatedTechnicien.email}
                  onChange={handleInputChange}
                  className="w-full mt-2 p-2 rounded bg-gray-100 dark:bg-gray-700 dark:text-white"
                />
              )}
            </div>

            <div className="mt-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Incidents Assignés
              </h2>
              {assignedIncidents.length > 0 ? (
                <div className="overflow-x-auto">
                <table className="min-w-full bg-white dark:bg-gray-800">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-200 border-b border-gray-300 dark:border-gray-600 text-left text-sm uppercase font-semibold">
                        Type d'incident
                      </th>
                      <th className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-200 border-b border-gray-300 dark:border-gray-600 text-left text-sm uppercase font-semibold">
                        Statut
                      </th>
                      <th className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-200 border-b border-gray-300 dark:border-gray-600 text-left text-sm uppercase font-semibold">
                        Description
                      </th>
                      <th className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-200 border-b border-gray-300 dark:border-gray-600 text-left text-sm uppercase font-semibold">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {assignedIncidents.map((incident) => (
                      <tr key={incident.id} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                        <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-600">
                          {incident.typeIncident}
                        </td>
                        <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-600">
                          {incident.statut}
                        </td>
                        <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-600">
                          {incident.description}
                        </td>
                        <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-600">
                          <button
                             onClick={() => openModal(incident.id)}
                            className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-1 px-2 rounded text-xs"
                          >
                            Changer le statut
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              ) : (
                <p>Aucun incident assigné.</p>
              )}
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Changer le statut de l'incident</h2>
      <select
        value={selectedStatus}
        onChange={handleStatusChange}
        className="w-full mt-2 p-2 rounded bg-gray-100 dark:bg-gray-700 dark:text-white"
      >
        <option value="">Sélectionnez un statut</option>
        <option value="EN_COURS">En cours</option>
        <option value="FAIT">Fait</option>
        <option value="EN_ATTENTE">En attente</option>
      </select>
      <div className="mt-4 flex justify-end">
        <button
          onClick={() => setIsModalOpen(false)}
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-4 rounded mr-2"
        >
          Annuler
        </button>
        <button
          onClick={handleSubmitStatus}
          className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-1 px-4 rounded"
        >
          Enregistrer
        </button>
      </div>
    </div>
  </div>
)}

    </div>
    
  );
};

export default ProfilTechnicien;
