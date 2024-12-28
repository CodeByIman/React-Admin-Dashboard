import './App.css'
import MainDash from './components/MainDash/MainDash';
import RightSide from './components/RigtSide/RightSide';
import Sidebar from './components/Sidebar';
import React, { useState } from 'react';

function App() {

  const [selected, setSelected] = useState(0);
  return (
    <div className="App">
      <div className="AppGlass">
      <Sidebar selected={selected} setSelected={setSelected} />
      <MainDash selected={selected} />
        <RightSide/>
      </div>
    </div>
  );
}

export default App;
