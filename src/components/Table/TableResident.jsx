// import * as React from "react";
// import './TableResident.css';
// import {
//   TableResident,
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
//   Radio,
//   RadioGroup,
//   FormControlLabel,
//   FormLabel,
//   MenuItem,
//   Select,
//   InputLabel,
//   FormControl,

// } from "@mui/material";
// import axios from "axios";
// import { useState, useEffect } from "react";

// const makeStyle = (status) => ({
//   background: status === "disponible" ? "rgb(145 254 159 / 47%)" : "#ffadad8f",
//   color: status === "disponible" ? "green" : "red",
// });

// export default function BasicTable() {
//   const [rows, setRows] = useState([]); // Data rows
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [open, setOpen] = useState(false);
//   const [isAddMode, setIsAddMode] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     incidentId: "",
//     paiementId: "",
//   });
//   const [currentChambre, setCurrentChambre] = useState(null);
//     const [filteredRows, setFilteredRows] = useState([]); // Filtered rows
//     const [searchQuery, setSearchQuery] = useState(""); // Search query
//     const [filter, setFilter] = useState("all"); // "all" or "disponible"
//     const [openAddDialog, setOpenAddDialog] = useState(false); // Add dialog state
//     const [newChambre, setNewChambre] = useState({ name: "", email: "" }); // New chambre data
  
//     useEffect(() => {
//       fetchChambres();
//     }, []);
  
//     useEffect(() => {
//       applyFilters();
//     }, [filter, searchQuery, rows]);

//   useEffect(() => {
//     fetchChambres();
//   }, []);

//   const fetchChambres = () => {
//     setLoading(true);
//     axios
//       .get("http://localhost:8080/api/residents")
//       .then((response) => {
//         setRows(response.data);
//         setLoading(false);
//       })
//       .catch(() => {
//         setError("Failed to fetch data");
//         setLoading(false);
//       });
//   };

//   const handleOpen = ( resident, addMode = false) => {
//     setIsAddMode(addMode);
//     if (addMode) {
//       setFormData({
//         name: "",
//         email: "",
//         disponible: false,
//         incidentId: "",
//         paiementId: "",
//       });
//     } else {
//       setCurrentresident(resident);
//       setFormData({
//         name:  resident.name,
//         email:  resident.email,
//         disponible:  resident.disponible,
//         incidentId:  resident.incidentId,
//         paiementId:  resident.paiementId,
//       });
//     }
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//     setCurrentresident(null);
//     setIsAddMode(false);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleRadioChange = (e) => {
//     setFormData({ ...formData, disponible: e.target.value === "true" });
//   };

//   const handleSubmit = () => {
//     if (isAddMode) {
//       axios
//         .post("http://localhost:8080/api/residents/create", formData)
//         .then(() => {
//           alert(" residents ajoutée avec succès !");
//           fetch Residents();
//           handleClose();
//         })
//         .catch((error) => {
//           alert("Erreur lors de l'ajout : " + error.message);
//         });
//     } else {
//       axios
//         .put(
//           `http://localhost:8080/api/residents/update/${current Resident.id}`,
//           formData
//         )
//         .then(() => {
//           alert(" Resident modifiée avec succès !");
//           fetch Residents();
//           handleClose();
//         })
//         .catch((error) => {
//           alert("Erreur lors de la modification : " + error.message);
//         });
//     }
//   };

//   const handleDelete = (id) => {
//     if (window.confirm(`Êtes-vous sûr de vouloir supprimer la resident ${id} ?`)) {
//       axios
//         .delete(`http://localhost:8080/api/residents/delete/${id}`)
//         .then(() => {
//           alert("Resident supprimée avec succès");
//           fetchResidents();
//         })
//         .catch((error) => {
//           alert("Erreur lors de la suppression : " + error.message);
//         });
//     }
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






//   if (loading) return <p>Chargement des données...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <div className="Table">
      

//  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px",marginTop: "20px"}}>
        
// <div style={{ display: "flex", gap: "20px", alignItems: "center" }}> 








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
//               <MenuItem value="all">Toutes les Residents</MenuItem>
//               <MenuItem value="disponible">Residents disponibles</MenuItem>
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






// </div>
// </div>





//       <TableContainer component={Paper} style={{ boxShadow: "0px 13px 20px 0px #80808029" }}>
//         <Table sx={{ minWidth: 650 }} aria-label="simple table">
//           <TableHead>
//             <TableRow>
//               <TableCell>iD resident</TableCell>
//               <TableCell align="left">age</TableCell>
//               <TableCell align="left">nom et prenom</TableCell>
              
//               <TableCell align="left">Occupé Par</TableCell>
              
//             </TableRow>
//           </TableHead>
          
// <TableBody>
// {filteredRows.map((row) => (
//     <TableRow key={row.id}>
//       <TableCell>{row.id}</TableCell>
      
//       <TableCell align="left">
//         <span style={makeStyle(row.disponible ? "disponible" : "occupée")}>
//           {row.disponible ? "disponible" : "occupée"}
//         </span>
//       </TableCell>
//       <TableCell align="left">
//         {row.residentId || "Non payee"}
//       </TableCell>
//       <TableCell align="left">
//         <Button onClick={() => handleOpen(row)}>Modifier</Button>
//         <Button onClick={() => handleDelete(row.id)}>Supprimer</Button>
//       </TableCell>
//     </TableRow>
//   ))}
// </TableBody>
//         </Table>
//       </TableContainer>
//       <Button
//         variant="contained"
//         color="primary"
//         style={{ marginTop: "20px" }}
//         onClick={() => handleOpen(null, true)}
//       >
//         Ajouter un Resident
//       </Button>
//       <Dialog open={open} onClose={handleClose}>
//         <DialogTitle>{isAddMode ? "Ajouter une Resident" : "Modifier Resident"}</DialogTitle>
//         <DialogContent>
//           <TextField
//             margin="dense"
//             name="name"
//             label="Name"
//             type="text"
//             fullWidth
//             value={formData.name}
//             onChange={handleInputChange}
//           />
//           <TextField
//             margin="dense"
//             name="email"
//             label="Email"
//             type="text"
//             fullWidth
//             value={formData.email}
//             onChange={handleInputChange}
//           />
//           <FormLabel component="legend">Disponible</FormLabel>
//           <RadioGroup
//             row
//             name="disponible"
//             value={formData.disponible.toString()}
//             onChange={handleRadioChange}
//           >
//             <FormControlLabel value="true" control={<Radio />} label="Disponible" />
//             <FormControlLabel value="false" control={<Radio />} label="Occupée" />
//           </RadioGroup>
//           <TextField
//             margin="dense"
//             name="incidentId"
//             label="ID de l'incident"
//             type="number"
//             fullWidth
//             value={formData.incidentId}
//             onChange={handleInputChange}
//           />
//           <TextField
//             margin="dense"
//             name="paiementId"
//             label="ID du Résident"
//             type="number"
//             fullWidth
//             value={formData.paiementId}
//             onChange={handleInputChange}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose}>Annuler</Button>
//           <Button onClick={handleSubmit} color="primary">
//             {isAddMode ? "Ajouter" : "Modifier"}
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// }









import * as React from "react";
import "./TableResident.css";
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
  FormControl,
} from "@mui/material";
import axios from "axios";
import { useState, useEffect } from "react";

const makeStyle = (status) => ({
  background: status === "disponible" ? "rgb(145 254 159 / 47%)" : "#ffadad8f",
  color: status === "disponible" ? "green" : "red",
});

export default function TableResident() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [isAddMode, setIsAddMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password:"",
    incidentId: "",
    paiementId: "",
  });
  const [currentResident, setCurrentResident] = useState(null);
  const [filteredRows, setFilteredRows] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchResidents();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filter, searchQuery, rows]);

  const fetchResidents = () => {
    setLoading(true);
    axios
      .get("http://localhost:8080/api/residents")
      .then((response) => {
        setRows(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Échec du chargement des données.");
        setLoading(false);
      });
  };

  const handleOpen = (resident, addMode = false) => {
    setIsAddMode(addMode);
    if (addMode) {
      setFormData({
        name: "",
        email: "",
        incidentId: "",
        paiementId: "",
      });
    } else {
      setCurrentResident(resident);
      setFormData({
        name: resident.name,
        email: resident.email,
        incidentId: resident.incidentId,
        paiementId: resident.paiementId,
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentResident(null);
    setIsAddMode(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    if (isAddMode) {
      axios
        .post("http://localhost:8080/api/residents/create", formData)
        .then(() => {
          alert("Resident ajouté avec succès !");
          fetchResidents();
          handleClose();
        })
        .catch((error) => {
          alert("Erreur lors de l'ajout : " + error.message);
        });
    } else {
      axios
        .put(
          `http://localhost:8080/api/residents/update/${currentResident.id}`,
          formData
        )
        .then(() => {
          alert("Resident modifié avec succès !");
          fetchResidents();
          handleClose();
        })
        .catch((error) => {
          alert("Erreur lors de la modification : " + error.message);
        });
    }
  };

  const handleDelete = (id) => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer le resident ${id} ?`)) {
      axios
        .delete(`http://localhost:8080/api/residents/delete/${id}`)
        .then(() => {
          alert("Resident supprimé avec succès !");
          fetchResidents();
        })
        .catch((error) => {
          alert("Erreur lors de la suppression : " + error.message);
        });
    }
  };

  const applyFilters = () => {
    let updatedRows = [...rows];
    if (filter === "disponible") {
      updatedRows = updatedRows.filter((row) => row.disponible);
    }
    if (searchQuery) {
      updatedRows = updatedRows.filter((row) =>
        row.id.toString().includes(searchQuery)
      );
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

  // JSX portion continues below.
  return (
    <div className="Table">
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
        <FormControl variant="outlined" size="small" className="custom-style ">
          <Select value={filter} onChange={handleFilterChange} className="text-white bg-purple-200 hover:bg-purple-100 focus:ring-0 focus:border-transparent rounded-[10px]"
 >
            <MenuItem value="all">Tous les Residents</MenuItem>
            <MenuItem value="disponible">Residents Disponibles</MenuItem>
          </Select>
        </FormControl>
        <TextField className="text-white bg-purple-200 hover:bg-purple-100 focus:ring-0 focus:border-transparent rounded-[10px]"
 
          size="small"
          variant="outlined"
          placeholder="Rechercher par ID"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nom</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>password</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.email}</TableCell>
                 <TableCell>{row.password}</TableCell>
                <TableCell>
                  <Button  style={{ fontSize: '12px', textTransform: 'lowercase' }}   class=" text-purple-600 hover:bg-white-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:hover:text-white-700 dark:focus:ring-primary-800 " onClick={() => handleOpen(row)}>Modifier</Button>
                  <Button  style={{ fontSize: '12px', textTransform: 'lowercase' }} class=" text-purple-600 hover:bg-white-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:hover:text-white-700 dark:focus:ring-primary-800 " onClick={() => handleDelete(row.id)}>Supprimer</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button   class=" text-white bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 mt-5" variant="contained" color="primary" onClick={() => handleOpen(null, true)}>
        Ajouter un Resident
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{isAddMode ? "Ajouter un Resident" : "Modifier Resident"}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            name="name"
            label="Nom"
            fullWidth
            value={formData.name}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="email"
            label="Email"
            fullWidth
            value={formData.email}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="password"
            label="password"
            fullWidth
            value={formData.password}
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
