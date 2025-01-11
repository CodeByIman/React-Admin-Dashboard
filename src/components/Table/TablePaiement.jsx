import React, { useState, useEffect } from "react";
import "./TablePaiement.css";
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
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import axios from "axios";

export default function TablePaiement() {
  const [paiements, setPaiements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [isAddMode, setIsAddMode] = useState(false);
  const [formData, setFormData] = useState({
    statu: "",
    montant: "",
    dateLimite: "",
    residentId: "",
  });
  const [currentPaiement, setCurrentPaiement] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchPaiements();
  }, []);

  const fetchPaiements = () => {
    setLoading(true);
    axios
      .get("http://localhost:8080/api/paiements")
      .then((response) => {
        setPaiements(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Échec du chargement des données.");
        setLoading(false);
      });
  };

  const handleOpen = (paiement = null, addMode = false) => {
    setIsAddMode(addMode);
    if (addMode) {
      setFormData({
        statu: "",
        montant: "",
        dateLimite: "",
      });
    } else {
      setCurrentPaiement(paiement);
      setFormData({
        statu: paiement.statu,
        montant: paiement.montant,
        dateLimite: paiement.dateLimite,
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentPaiement(null);
    setIsAddMode(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
   
      axios
        .post("http://localhost:8080/api/paiements/add", formData)
        .then(() => {
          alert("Paiement ajouté avec succès !");
          fetchPaiements();
          handleClose();
        })
        .catch((error) => {
          alert("Erreur lors de l'ajout : " + error.message);
        });
   
    
  };


  const filteredPaiements = paiements.filter((paiement) =>
    paiement.id.toString().includes(searchQuery)
  );

  if (loading) return <p>Chargement des données...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="Table">
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
        <TextField  className="text-white bg-purple-200 hover:bg-purple-100 focus:ring-0 focus:border-transparent rounded-[10px]"
 
          size="small"
          variant="outlined"
          placeholder="Rechercher par ID"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Statut</TableCell>
              <TableCell>Montant</TableCell>
              <TableCell>Date Limite</TableCell>
              <TableCell>id de resident </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredPaiements.map((paiement) => (
              <TableRow key={paiement.id}>
                <TableCell>{paiement.id}</TableCell>
                <TableCell>{paiement.statu}</TableCell>
                <TableCell>{paiement.montant}</TableCell>
                <TableCell>{paiement.dateLimite}</TableCell>
                <TableCell>{paiement.residentId}</TableCell>
                
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button   class=" text-white bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 mt-5" variant="contained" color="primary" onClick={() => handleOpen(null, true)}>
        Ajouter un Paiement
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{isAddMode ? "Ajouter un Paiement" : "Modifier Paiement"}</DialogTitle>
        <DialogContent>
          
          
 

            
          <TextField
            margin="dense"
            name="montant"
            label="montant"
            fullWidth
            value={formData.montant}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="residentId"
            label="residentId"
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
