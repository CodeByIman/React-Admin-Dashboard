import * as React from "react";
import './Table.css';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  MenuItem,
  Select,
  InputLabel,
  FormControl,

} from "@mui/material";
import axios from "axios";
import { useState, useEffect } from "react";

const makeStyle = (status) => ({
  background: status === "DISPONIBLE" ? "rgb(145 254 159 / 47%)" : status === "OCCUPEE" ? "#ffadad8f" : "#Fed8b1",
  color: status === "DISPONIBLE" ? "green" : status === "OCCUPEE" ? "red" : "orange",
});

export default function BasicTable() {
  const [rows, setRows] = useState([]); // Data rows
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [isAddMode, setIsAddMode] = useState(false);
  const [formData, setFormData] = useState({
    taille: "",
    equipements: "",
    status: "DISPONIBLE",
    
    residentId: null
  });
  const [currentChambre, setCurrentChambre] = useState(null);
    const [filteredRows, setFilteredRows] = useState([]); // Filtered rows
    const [searchQuery, setSearchQuery] = useState(""); // Search query
    const [filter, setFilter] = useState("all"); // "all" or "disponible"
    const [openAddDialog, setOpenAddDialog] = useState(false); // Add dialog state
    const [newChambre, setNewChambre] = useState({ taille: "", equipements: "", status: true }); // New chambre data
    const [residentDialogOpen, setResidentDialogOpen] = useState(false);
const [residentData, setResidentData] = useState([]);
const [residentDialog1Open, setResidentDialog1Open] = useState(false);

  
    useEffect(() => {
      fetchChambres();
    }, []);
  
    useEffect(() => {
      applyFilters();
    }, [filter, searchQuery, rows]);

  useEffect(() => {
    fetchChambres();
  }, []);

  const fetchChambres = () => {
    setLoading(true);
    axios
      .get("http://localhost:8080/api/chambres")
      .then((response) => {
        setRows(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch data");
        setLoading(false);
      });
  };

  const handleOpen = (chambre, addMode = false) => {
    setIsAddMode(addMode);
    if (addMode) {
      setFormData({
        taille: "",
        equipements: "",
        status: "DISPONIBLE",
        residenceId: "",
        residentId: "",
      });
    } else {
      setCurrentChambre(chambre);
      setFormData({
        taille: chambre.taille,
        equipements: chambre.equipements,
        status: chambre.status,
        
        residentId: chambre.residentId,
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentChambre(null);
    setIsAddMode(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleStatusChange = (e) => {
    // Updated handler for status radio button
    setFormData({ ...formData, status: e.target.value });
  };
  

  const handleSubmit = () => {
    if (isAddMode) {
      axios
        .post("http://localhost:8080/api/chambres/create", formData)
        .then(() => {
          alert("Chambre ajoutée avec succès !");
          fetchChambres();
          handleClose();
        })
        .catch((error) => {
          alert("Erreur lors de l'ajout : " + error.message);
        });
    } else {
      axios
        .put(
          `http://localhost:8080/api/chambres/update/${currentChambre.id}`,
          formData
        )
        .then(() => {
          alert("Chambre modifiée avec succès !");
          fetchChambres();
          handleClose();
        })
        .catch((error) => {
          alert("Erreur lors de la modification : " + error.message);
        });
    }
  };

  const handleDelete = (id) => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer la chambre ${id} ?`)) {
      axios
        .delete(`http://localhost:8080/api/chambres/delete/${id}`)
        .then(() => {
          alert("Chambre supprimée avec succès");
          fetchChambres();
        })
        .catch((error) => {
          alert("Erreur lors de la suppression : " + error.message);
        });
    }
  };



  

  const applyFilters = () => {
    let updatedRows = [...rows];
    if (filter !== "all") {
      updatedRows = updatedRows.filter((row) => row.status === filter); // Filter based on status
    }
    if (searchQuery) {
      updatedRows = updatedRows.filter((row) => row.id.toString().includes(searchQuery));
    }
    setFilteredRows(updatedRows);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };



  const handleResidentClick = (chambreId) => {
    
    axios
      .get(`http://localhost:8080/api/residents/chambre/${chambreId}`) // Assurez-vous que cette route renvoie les résidents avec l'ID correspondant.
      .then((response) => {
        setResidentData(response.data); // Met à jour les résidents à afficher.
        setResidentDialogOpen(true); // Ouvre le dialogue.
      })
      .catch((error) => {
        alert("Erreur lors de la récupération des résidents : " , error.response ? error.response.data : error.message);
      });
  };



  const handleDeleteResident = (residentId) => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer le résident ${residentId} ?`)) {
      axios
        .delete(`http://localhost:8080/api/residents/delete/${residentId}`)
        .then(() => {
          alert("Résident supprimé avec succès");
          setResidentData(residentData.filter((resident) => resident.id !== residentId)); // Mise à jour des données localement.
        })
        .catch((error) => {
          alert("Erreur lors de la suppression : " + error.message);
        });
    }
  };
    


  

// Nouvelle méthode pour récupérer les résidents sans chambre
const handleAssignResidentClick = (chambre) => {
  axios
    .get("http://localhost:8080/api/residents/without-chambre") // Assurez-vous que cette route renvoie les résidents sans chambre
    .then((response) => {
      setResidentData(response.data);
      setCurrentChambre(chambre); // Conserver la chambre sélectionnée
      setResidentDialog1Open(true); // Ouvre le dialogue
    })
    .catch((error) => {
      alert("Erreur lors de la récupération des résidents : " + (error.response ? error.response.data : error.message));
    });
};

const handleAssignResident = (residentId) => {
  axios
    .put(`http://localhost:8080/api/chambres/assign/${currentChambre.id}`, { residentId }) // Adapter la route
    .then(() => {
      alert("Résident attribué avec succès !");
      fetchChambres();
      setResidentDialog1Open(false); // Fermer le dialogue après l'attribution
    })
    .catch((error) => {
      alert("Erreur lors de l'attribution : " + (error.response ? error.response.data : error.message));
    });
};









  if (loading) return <p>Chargement des données...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="Table">
      

 <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px",marginTop: "20px"}}>
        
<div style={{ display: "flex", gap: "20px", alignItems: "center" }}> 








<FormControl className="custom-style" variant="outlined" size="small">
            <Select value={filter} onChange={handleFilterChange} label="Filtrer par">
              <MenuItem value="all">Toutes les chambres</MenuItem>
              <MenuItem value="DISPONIBLE">Chambres disponibles</MenuItem>
              <MenuItem value="OCCUPEE">Chambres occupées</MenuItem>
              <MenuItem value="MAINTENANCE">Chambres en maintenance</MenuItem>
            </Select>
          </FormControl>
          <TextField className="custom-style"
            size="small"
            variant="outlined"
            placeholder="Rechercher ID"
            value={searchQuery}
            onChange={handleSearchChange}
            
            InputProps={{
              style: {
                
                borderRadius: "10px",
              },
            }}
          />






</div>
</div>





      <TableContainer component={Paper} style={{  boxShadow: "0px 13px 20px 0px #80808029" }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Numéro Chambre</TableCell>
              <TableCell align="left">Taille</TableCell>
              <TableCell align="left">Équipement</TableCell>
              <TableCell align="left">Statut</TableCell>
              <TableCell align="left">Occupé Par</TableCell>
              <TableCell align="left">Actions</TableCell>
            </TableRow>
          </TableHead>
          
<TableBody>
{filteredRows.map((row) => (
    <TableRow key={row.id}>
      <TableCell>{row.id}</TableCell>
      <TableCell align="left">{row.taille}</TableCell>
      <TableCell align="left">{row.equipements}</TableCell>
      <TableCell align="left">
      <span className="status" style={makeStyle(row.status)}>
          {row.status}
        </span>
      </TableCell>
      <TableCell align="left">
  <span  class=" text-purple-600 hover:bg-white-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:hover:text-white-700 dark:focus:ring-primary-800 " 
    style={{ cursor: "pointer",fontSize: '12px', textTransform: 'lowercase' }}
    
    onClick={() => handleResidentClick(row.id)}
  >
    {row.residentId ? "voir" : "Non occupée"}
  </span>



</TableCell>
<TableCell align="left">
  <Button     class=" text-purple-600 hover:bg-white-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:hover:text-white-700 dark:focus:ring-primary-800 " 
    style={{ fontSize: '12px', textTransform: 'lowercase' }}
    onClick={() => handleOpen(row)}
  >
    Modifier
  </Button>
  <Button class=" text-purple-600 hover:bg-white-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:hover:text-white-700 dark:focus:ring-primary-800 "
    style={{ fontSize: '12px', textTransform: 'lowercase' }}
    onClick={() => handleDelete(row.id)}
  >
    Supprimer
  </Button>
  <Button class=" text-purple-600 hover:bg-white-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:hover:text-white-700 dark:focus:ring-primary-800 " 
    style={{ fontSize: '12px', textTransform: 'lowercase' }}
    onClick={() => handleAssignResidentClick(row)}
  >
    attribuer la chambre
  </Button>
</TableCell>



    </TableRow>
  ))}
</TableBody>
        </Table>
      </TableContainer>
      <Button   class=" text-white bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 mt-5" 
        variant="contained"
        color="primary"
        style={{ marginTop: "20px" }}
        onClick={() => handleOpen(null, true)}
      >
        Ajouter une Chambre
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{isAddMode ? "Ajouter une Chambre" : "Modifier Chambre"}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            name="taille"
            label="Taille"
            type="text"
            fullWidth
            value={formData.taille}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="equipements"
            label="Équipements"
            type="text"
            fullWidth
            value={formData.equipements}
            onChange={handleInputChange}
          />
          <FormControl fullWidth style={{ marginTop: "10px" }}>
            <InputLabel id="status-label">Statut</InputLabel>
            <Select
              labelId="status-label"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
            >
              <MenuItem value="DISPONIBLE">Disponible</MenuItem>
              <MenuItem value="OCCUPEE">Occupée</MenuItem>
              <MenuItem value="MAINTENANCE">Maintenance</MenuItem>
            </Select>
          </FormControl>
          
          <TextField
            margin="dense"
            name="residentId"
            label="ID du Résident"
            type="number"
            fullWidth
            value={formData.residentId}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Annuler</Button>
          <Button onClick={handleSubmit} color="primary">
            {isAddMode ? "Ajouter" : "Modifier"}
          </Button>
        </DialogActions>
      </Dialog>


      <Dialog  open={residentDialogOpen} onClose={() => setResidentDialogOpen(false)}>
  <DialogTitle style={{ border: 'none', backgroundColor: '#f0f0f0' }}>Résidents de la chambre</DialogTitle>
  <DialogContent style={{ border: 'none', backgroundColor: '#f0f0f0' }}>
    <TableContainer style={{ 
  border: 'none', 
  borderRadius: '0', 
  boxShadow: 'none', 
  backgroundColor: '#f0f0f0' 
}} component={Paper}>
      <Table style={{ border: 'none', backgroundColor: '#f0f0f0' }}>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Nom</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {residentData.map((resident) => (
            <TableRow key={resident.id}>
              <TableCell>{resident.id}</TableCell>
              <TableCell>{resident.nom}</TableCell>
              <TableCell>{resident.email}</TableCell>
              <TableCell>
                <Button class=" text-purple-600 hover:bg-white-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:hover:text-white-700 dark:focus:ring-primary-800 " color="secondary"
                  onClick={() => handleDeleteResident(resident.id)}
                >
                  Supprimer
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </DialogContent>
  <DialogActions style={{ border: 'none', backgroundColor: '#f0f0f0' }}>
    <Button class=" text-purple-600 hover:bg-white-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:hover:text-white-700 dark:focus:ring-primary-800 " onClick={() => setResidentDialogOpen(false)}>Fermer</Button>
  </DialogActions>
</Dialog>




<Dialog open={residentDialog1Open} onClose={() => setResidentDialog1Open(false)}>
  <DialogTitle>Attribuer un résident</DialogTitle>
  <DialogContent>
    <TableContainer component={Paper}
    style={{ 
      border: 'none', 
      borderRadius: '0', 
      boxShadow: 'none', 
      
    }} >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Nom</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Attribuer</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {residentData.map((resident) => (
            <TableRow key={resident.id}>
              <TableCell>{resident.id}</TableCell>
              <TableCell>{resident.nom}</TableCell>
              <TableCell>{resident.email}</TableCell>
              <TableCell>
                <Button class=" text-purple-600 hover:bg-white-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:hover:text-white-700 dark:focus:ring-primary-800 " 
                  
                  onClick={() => handleAssignResident(resident.id)}
                >
                  Sélectionner
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </DialogContent>
</Dialog>

    </div>
  );
}



