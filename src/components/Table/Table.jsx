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
    residenceId: "",
    residentId: "",
  });
  const [currentChambre, setCurrentChambre] = useState(null);
    const [filteredRows, setFilteredRows] = useState([]); // Filtered rows
    const [searchQuery, setSearchQuery] = useState(""); // Search query
    const [filter, setFilter] = useState("all"); // "all" or "disponible"
    const [openAddDialog, setOpenAddDialog] = useState(false); // Add dialog state
    const [newChambre, setNewChambre] = useState({ taille: "", equipements: "", status: true }); // New chambre data
  
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
        residenceId: chambre.residenceId,
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
        {row.residentId || "Non occupée"}
      </TableCell>
      <TableCell align="left">
        <Button onClick={() => handleOpen(row)}>Modifier</Button>
        <Button onClick={() => handleDelete(row.id)}>Supprimer</Button>
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
            name="residenceId"
            label="ID de la Résidence"
            type="number"
            fullWidth
            value={formData.residenceId}
            onChange={handleInputChange}
          />
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
    </div>
  );
}





















































// import './Table.css';
// import React, { useState, useEffect } from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   TextField,
//   Button,
//   MenuItem,
//   Select,
//   InputLabel,
//   FormControl,
// } from "@mui/material";
// import axios from "axios";

// const makeStyle = (status) => ({
//   background: status === "disponible" ? "rgb(145 254 159 / 47%)" : "#ffadad8f",
//   color: status === "disponible" ? "green" : "red",
// });

// export default function BasicTable() {
//   const [rows, setRows] = useState([]); // All data rows
//   const [filteredRows, setFilteredRows] = useState([]); // Filtered rows
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [searchQuery, setSearchQuery] = useState(""); // Search query
//   const [filter, setFilter] = useState("all"); // "all" or "disponible"
//   const [openAddDialog, setOpenAddDialog] = useState(false); // Add dialog state
//   const [newChambre, setNewChambre] = useState({ taille: "", equipements: "", disponible: true }); // New chambre data

//   useEffect(() => {
//     fetchChambres();
//   }, []);

//   useEffect(() => {
//     applyFilters();
//   }, [filter, searchQuery, rows]);

//   const fetchChambres = () => {
//     setLoading(true);
//     axios
//       .get("http://localhost:8080/api/chambres")
//       .then((response) => {
//         setRows(response.data);
//         setLoading(false);
//       })
//       .catch(() => {
//         setError("Failed to fetch data");
//         setLoading(false);
//       });
//   };

//   const applyFilters = () => {
//     let updatedRows = [...rows];
//     if (filter === "disponible") {
//       updatedRows = updatedRows.filter((row) => row.disponible);
//     }
//     if (searchQuery) {
//       updatedRows = updatedRows.filter((row) => row.id.toString().includes(searchQuery));
//     }
//     setFilteredRows(updatedRows);
//   };

//   const handleSearchChange = (e) => {
//     setSearchQuery(e.target.value);
//   };

//   const handleFilterChange = (e) => {
//     setFilter(e.target.value);
//   };

//   const handleAddChambre = () => {
//     axios
//       .post("http://localhost:8080/api/chambres", newChambre)
//       .then((response) => {
//         setRows((prevRows) => [...prevRows, response.data]);
//         setOpenAddDialog(false); // Close dialog
//         setNewChambre({ taille: "", equipements: "", disponible: true }); // Reset form
//       })
//       .catch(() => alert("Erreur lors de l'ajout de la chambre"));
//   };

//   if (loading) return <p>Chargement des données...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <div className="Table">
//       <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px",marginTop: "20px"}}>
        
//         <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
//           <FormControl  className="custom-style"
//             variant="outlined"
//             size="small"
//             style={{
              
//             }}
//           >
           
//             <Select
//               value={filter}
//               onChange={handleFilterChange}
//               label="Filtrer par"
//               style={{
//                 borderRadius: "10px",
                
//               }}
//             >
//               <MenuItem value="all">Toutes les chambres</MenuItem>
//               <MenuItem value="disponible">Chambres disponibles</MenuItem>
//             </Select>
//           </FormControl>
//           <TextField className="custom-style"
//             size="small"
//             variant="outlined"
//             placeholder="Rechercher ID"
//             value={searchQuery}
//             onChange={handleSearchChange}
            
//             InputProps={{
//               style: {
                
//                 borderRadius: "10px",
//               },
//             }}
//           />
//           <Button className="custom-style"
//             variant="contained"
//             color="primary"
//             onClick={() => setOpenAddDialog(true)}
            
//           >
//             Ajouter une chambre
//           </Button>
//         </div>
//       </div>
//       <TableContainer component={Paper} style={{ boxShadow: "0px 13px 20px 0px #80808029" }}>
//         <Table sx={{ minWidth: 650 }} aria-label="simple table">
//           <TableHead>
//             <TableRow>
//               <TableCell>Numéro Chambre</TableCell>
//               <TableCell align="left">Taille</TableCell>
//               <TableCell align="left">Équipement</TableCell>
//               <TableCell align="left">Statut</TableCell>
//               <TableCell align="left">Occupé Par</TableCell>
//               <TableCell align="left">Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {filteredRows.map((row) => (
//               <TableRow key={row.id}>
//                 <TableCell>{row.id}</TableCell>
//                 <TableCell align="left">{row.taille}</TableCell>
//                 <TableCell align="left">{row.equipements}</TableCell>
//                 <TableCell align="left">
//                   <span style={makeStyle(row.disponible ? "disponible" : "occupée")}>
//                     {row.disponible ? "disponible" : "occupée"}
//                   </span>
//                 </TableCell>
//                 <TableCell align="left">{row.residentId || "Non occupée"}</TableCell>
//                 <TableCell align="left">
//                   <Button>Modifier</Button>
//                   <Button>Supprimer</Button>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       {/* Dialog for adding a chambre */}
//       <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)}>
//         <DialogTitle>Ajouter une nouvelle chambre</DialogTitle>
//         <DialogContent>
//           <TextField
//             margin="dense"
//             label="Taille"
//             type="text"
//             fullWidth
//             variant="outlined"
//             value={newChambre.taille}
//             onChange={(e) => setNewChambre({ ...newChambre, taille: e.target.value })}
//           />
//           <TextField
//             margin="dense"
//             label="Équipements"
//             type="text"
//             fullWidth
//             variant="outlined"
//             value={newChambre.equipements}
//             onChange={(e) => setNewChambre({ ...newChambre, equipements: e.target.value })}
//           />
//           <FormControl fullWidth margin="dense">
//             <InputLabel>Disponibilité</InputLabel>
//             <Select
//               value={newChambre.disponible}
//               onChange={(e) => setNewChambre({ ...newChambre, disponible: e.target.value === "true" })}
//             >
//               <MenuItem value="true">Disponible</MenuItem>
//               <MenuItem value="false">Occupée</MenuItem>
//             </Select>
//           </FormControl>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setOpenAddDialog(false)}>Annuler</Button>
//           <Button onClick={handleAddChambre} color="primary">
//             Ajouter
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// }