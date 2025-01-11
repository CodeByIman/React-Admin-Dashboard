import React, { useEffect, useState } from 'react';
import profile from "../../imgs/profile.png";
import back from "../../imgs/back.jpg";
import axios from 'axios'; // Import axioss
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


const ProfilResident = () => {
  const [resident, setResident] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [open, setOpen] = useState(false);
   const [updatedResident, setUpdatedResident] = useState({
  name: '',
  email: '',
  chambreId: 0,
  });


  const [formData, setFormData] = useState({
    typeIncident: '',
    statut: '',
    description: '',
  });


  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  






const handleSubmit = async (e) => {
  e.preventDefault();
  if (!resident || !resident.id) {
    alert("Résident non chargé. Impossible de déclarer un incident.");
    return;
  }
  const incidentData = {
    ...formData,
    residentId: resident.id, // Fix: Utilisation de l'ID du résident
  };

  try {
    await axios.post('http://localhost:8080/api/incidents/add', incidentData);
    alert("Incident déclaré avec succès !");
    handleClose();
  } catch (error) {
    console.error("Erreur lors de la déclaration de l'incident", error);
    alert("Erreur lors de la déclaration de l'incident.");
  }
};



  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedResident({ ...updatedResident, [name]: value });
  };
  
  const handleSaveChanges = () => {
    fetch(`http://localhost:8080/api/residents/update/${resident.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedResident),
    })
      .then((response) => {
        if (response.ok) {
          alert("Résident modifié avec succès !");
          setResident(updatedResident); // Mettez à jour l’état avec les nouvelles données
          setIsEditing(false); // Quitte le mode édition
        } else {
          return response.json().then((data) => {
            throw new Error(data.message || 'Erreur de mise à jour.');
          });
        }
      })
      .catch((error) => {
        alert("Erreur lors de la modification : " + error.message);
      });
  };
  

  useEffect(() => {
    const residentData = localStorage.getItem('resident');
    if (residentData) {
      setResident(JSON.parse(residentData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('resident');
    window.location.href = '/login';
  };

  
  if (!resident) {
    return <p>Loading...</p>;
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen p-4 transition-colors duration-200">
      <div className="max-w-2xl mx-auto">
      {/* {isEditing ? (
  <>
    <div>
      <label className="block text-gray-900 dark:text-white">Nom</label>
      <input
        type="text"
        name="name"
        value={updatedResident.name}
        onChange={handleInputChange}
        className="w-full p-2 rounded bg-gray-100 dark:bg-gray-700 dark:text-white"
      />
    </div>
    <div className="mt-4">
      <label className="block text-gray-900 dark:text-white">Email</label>
      <input
        type="email"
        name="email"
        value={updatedResident.email}
        onChange={handleInputChange}
        className="w-full p-2 rounded bg-gray-100 dark:bg-gray-700 dark:text-white"
      />
    </div>
    <div className="mt-4">
      <label className="block text-gray-900 dark:text-white">Chambre</label>
      <input
        type="number"
        name="chambreId"
        value={updatedResident.chambreId}
        onChange={handleInputChange}
        className="w-full p-2 rounded bg-gray-100 dark:bg-gray-700 dark:text-white"
      />
    </div>
    <button
      onClick={handleSaveChanges}
      className="mt-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
    >
      Enregistrer
    </button>
  </>
) : (
   */}

<div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-colors duration-200">
          <div className="relative h-48">
            <img
              src={back}
              alt="Cover"
              className="w-full h-full object-cover"
            />
            <div className="absolute -bottom-12 left-6">
              <img
                  src={profile} alt="logo" 
                className="w-24 h-24 rounded-xl object-cover border-4 border-white dark:border-gray-800 shadow-lg"
              />
            </div>
          </div>

          <div className="pt-16 px-6 pb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {resident.name}
                </h1>
                <p className="text-purple-600 dark:text-purple-400">
                
                </p>
                {isEditing && (
      <input
        type="text"
        name="name"
        value={updatedResident.name}
        onChange={handleInputChange}
        className="w-full mt-2 p-2 rounded bg-gray-100 dark:bg-gray-700 dark:text-white"
      />
    )}
                
              </div>
              {/* <button
                
                onClick={ handleEditClick}
                className="inline-flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors duration-200 text-sm font-medium"
              >
                modifier vos info
                {/* SVG icon */}
              {/* </button>  */}
              <div className="flex gap-2">
  <button
    onClick={() => setIsEditing(!isEditing)}
    className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors duration-200 text-sm font-medium"
  >
    {isEditing ? 'Annuler' : 'Modifier vos infos'}
  </button>
  {isEditing && (
    <button
      onClick={handleSaveChanges}
      className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-200 text-sm font-medium"
    >
      Submit
    </button>
  )}
  <button
     onClick={handleOpen}
      className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200 text-sm font-medium"
    >
      declarer incident
    </button>
</div>

            </div>

           
            <div className="mt-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Contact Info
              </h2>
              Email : <a
                href={`mailto:${resident.email}`}
                className="inline-flex items-center text-purple-600 dark:text-purple-400 hover:underline"
              >
                 <span className="text-purple-600 dark:text-purple-400">
                
                {resident.email} </span> </a>
                {isEditing && (
      <p><input
        type="email"
        name="email"
        value={updatedResident.email}
        onChange={handleInputChange}
        className="w-full m-1 mt-2 p-2 rounded bg-gray-100 dark:bg-gray-700 dark:text-white"
      /></p>
    )}
             
            </div>
            

            <p className="mt-6 text-gray-600 dark:text-gray-300">
           
           
           
           
           
               </p>

            <div className="mt-6">
             <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
             Chambre occupée
              </h2>
             {resident.chambreId === 0 ? (
             <p className="text-gray-600 dark:text-gray-300">
             Aucune chambre n'est occupée pour le moment. Veuillez demander au service d'administration de vous attribuer une chambre.
             </p>
               ) : (
              <p className="text-gray-600 dark:text-gray-300">
                Vous occupez actuellement la chambre numéro {resident.chambreId}.
              </p>
              )}
            </div>
          </div>
        </div>
        </div>


         {/* )} */}
         
      </div>


      <Modal open={open} onClose={handleClose}>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <TextField
            label="Type d'incident"
            name="typeIncident"
            value={formData.typeIncident}
            onChange={handleChange}
            required
          />
          <TextField
            label="Statut"
            name="statut"
            value={formData.statut}
            onChange={handleChange}
            required
          />
          <TextField
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            multiline
            rows={4}
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            Soumettre
          </Button>
        </Box>
      </Modal>
    
    </div>
  );
};

export default ProfilResident;
