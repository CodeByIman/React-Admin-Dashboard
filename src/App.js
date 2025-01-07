import './App.css'
import MainDash from './components/MainDash/MainDash';
import RightSide from './components/RigtSide/RightSide';
import Sidebar from './components/Sidebar';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';  // Corrige les importations manquantes pour Routes et Route
import Login from './components/ProfileResident/loginResident';  // Vérifiez le chemin correct pour le composant Login
import ProfilResident from './components/ProfileResident/ProfilResident';  // Vérifiez le chemin correct pour ProfileResident


function App() {

  const [selected, setSelected] = useState(0);
  return (
//     <div className="App">
//       <div className="AppGlass">
//       <Sidebar selected={selected} setSelected={setSelected} />
//       <MainDash selected={selected} />
//         <RightSide/>
//       </div>
//     </div>
//   );
// }

// export default App;


<Router>
      <Routes>
        {/* Route pour le tableau de bord */}
        <Route path="/" element={
          <div className="App">
            <div className="AppGlass">
              <Sidebar selected={selected} setSelected={setSelected} />
              <MainDash selected={selected} />
              <RightSide />
            </div>
          </div>
        } />

        {/* Route pour la page de connexion */}
        <Route path="/login" element={<Login />} />

        {/* Route pour la page de profil résident */}
        <Route path="/profile" element={<ProfilResident />} />
      </Routes>
    </Router>
  );
}

export default App;
