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





      <TableContainer component={Paper} style={{ boxShadow: "0px 13px 20px 0px #80808029" }}>
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
  <span
    style={{ cursor: "pointer", color: "blue", textDecoration: "underline",fontSize: '12px', textTransform: 'lowercase' }}
    
    onClick={() => handleResidentClick(row.id)}
  >
    {row.residentId ? "voir" : "Non occupée"}
  </span>



</TableCell>
<TableCell align="left">
  <Button
    style={{ fontSize: '12px', textTransform: 'lowercase' }}
    onClick={() => handleOpen(row)}
  >
    Modifier
  </Button>
  <Button
    style={{ fontSize: '12px', textTransform: 'lowercase' }}
    onClick={() => handleDelete(row.id)}
  >
    Supprimer
  </Button>
  <Button
    style={{ fontSize: '12px', textTransform: 'lowercase' }}
    onClick={() => handleDelete(row.id)}
  >
    attribuer la chambre
  </Button>
</TableCell>



    </TableRow>
  ))}
</TableBody>
        </Table>
      </TableContainer>
      <Button
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


      <Dialog open={residentDialogOpen} onClose={() => setResidentDialogOpen(false)}>
  <DialogTitle>Résidents de la chambre</DialogTitle>
  <DialogContent>
    <TableContainer component={Paper}>
      <Table>
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
                <Button
                  color="secondary"
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
  <DialogActions>
    <Button onClick={() => setResidentDialogOpen(false)}>Fermer</Button>
  </DialogActions>
</Dialog>

    </div>
  );
}



