
import Cards from "../Cards/Cards";
import Table from "../Table/Table";
import TableResident from "../Table/TableResident";
import TablePaiement from "../Table/TablePaiement";
import "./MainDash.css";

import Sidebar from "../Sidebar";
import TableIncident from "../Table/TableIncident";
const MainDash = ({ selected }) => {
  
     
  return (
    <div className="MainDash">
      
       <h1 class="mt-8 mb-3 text-2lg font-extrabold leading-none tracking-tight text-gray-900 md:text-2lg lg:text-2lg dark:text-white" >{selected === 0 ? "Chambres & Statistiques" : selected === 1?"Lest des Résidents ":selected===2? "Liste des Paiement": "Liste des incidents"}</h1>
        
       {selected === 0 && (
    <>
      <Cards />
      <Table />
    </>
  )}
        {selected === 1 && <TableResident />}
        {selected === 2 && <TablePaiement />}
        {selected === 3 && <TableIncident />}
    </div>
  );
};

export default MainDash;
