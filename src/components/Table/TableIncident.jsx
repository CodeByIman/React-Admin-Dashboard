import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import axios from "axios";
import "./TableIncident.css";

export default function TableIncident() {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [formData, setFormData] = useState({
      typeIncident: "",
      statut: "",
      description: "",
      technicienId: "",
      residentId: "",
    });

  useEffect(() => {
    fetchIncidents();
  }, []);

  const fetchIncidents = () => {
    setLoading(true);
    axios
      .get("http://localhost:8080/api/incidents")
      .then((response) => {
        setIncidents(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Échec du chargement des données.");
        setLoading(false);
      });
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredIncidents = incidents.filter((incident) => {
    const matchesSearch = incident.id.toString().includes(searchQuery);
    const matchesFilter =
      filter === "all" || incident.statut.toLowerCase() === filter;
    return matchesSearch && matchesFilter;
  });

  if (loading) return <p>Chargement des données...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="Table">
     <div
  style={{
    display: "flex",
    gap: "10px", // Adjust the gap value as needed
    marginBottom: "20px",
  }}
>
  <FormControl
    variant="outlined"
    size="small"
    className="text-white bg-purple-200 hover:bg-purple-100 focus:ring-0 focus:border-transparent rounded-[10px]"
  >
    <Select value={filter} onChange={handleFilterChange}>
      <MenuItem value="all">Tous les Incidents</MenuItem>
      <MenuItem value="non résolu">Non Résolus</MenuItem>
      <MenuItem value="résolu">Résolus</MenuItem>
    </Select>
  </FormControl>
  <TextField
    className="text-white bg-purple-200 hover:bg-purple-100 focus:ring-0 focus:border-transparent rounded-[10px]"
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
              <TableCell>Type d'Incident</TableCell>
              <TableCell>Statut</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>ID Technicien responsable</TableCell>
              <TableCell>ID Résident</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredIncidents.map((incident) => (
              <TableRow key={incident.id}>
                <TableCell>{incident.id}</TableCell>
                <TableCell>{incident.typeIncident}</TableCell>
                <TableCell>{incident.statut}</TableCell>
                <TableCell>{incident.description}</TableCell>
                <TableCell>{incident.technicienId || <button class=" text-purple-600 hover:bg-white-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-0 py-2.5 text-center dark:hover:text-white-700 dark:focus:ring-primary-800 " 
  >assigner</button>}</TableCell>
                <TableCell>{incident.residentId}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
