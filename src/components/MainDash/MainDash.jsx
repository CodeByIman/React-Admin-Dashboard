
import Cards from "../Cards/Cards";
import Table from "../Table/Table";
import TableResident from "../Table/TableResident";
import "./MainDash.css";

import Sidebar from "../Sidebar";
const MainDash = ({ selected }) => {
  
     
  return (
    <div className="MainDash">
      
       <h1>{selected === 0 ? "Chambres & Statistiques" : "Résidents & Statistiques"}</h1>
        
       {selected === 0 && (
    <>
      <Cards />
      <Table />
    </>
  )}
        {selected === 1 && <TableResident />}
    </div>
  );
};

export default MainDash;
