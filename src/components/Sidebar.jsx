import React, { useState } from "react";
import "./Sidebar.css";
import Logo from "../imgs/logo.png";
import { UilSignOutAlt } from "@iconscout/react-unicons";
import { SidebarData } from "../Data/Data";
import { UilBars } from "@iconscout/react-unicons";
import { motion } from "framer-motion";
import MainDash from "./MainDash/MainDash";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Sidebar = ({ selected, setSelected }) => {
 

  const [expanded, setExpaned] = useState(true)
  const navigate = useNavigate(); // navigation

  const sidebarVariants = {
    true: {
      left : '0'
    },
    false:{
      left : '-60%'
    }
  }
  // Sign-out function
  // Sign-out function
  const handleSignOut = () => {
    navigate("/"); // Redirect to login page
  };


  console.log(window.innerWidth)
  return (
    <>
      <div className="bars" style={expanded?{left: '60%'}:{left: '5%'}} onClick={()=>setExpaned(!expanded)}>
        <UilBars />
      </div>
    <motion.div className='sidebar'
    variants={sidebarVariants}
    animate={window.innerWidth<=768?`${expanded}`:''}
    >
      {/* logo */}
      <div className="logo">
        <img src={Logo} alt="logo" />
        <span>
          Admin<span></span>
        </span>
      </div>

      <div className="menu">
      {SidebarData.map((item, index) => (
        <div
          className={selected === index ? "menuItem active" : "menuItem"}
          key={index}
          onClick={() => setSelected(index)}
        >
          <item.icon />
          <span>{item.heading}</span>
        </div>
      ))}
      {/* Sign Out Button */}
      <div className="menuItem" onClick={handleSignOut}>
            <UilSignOutAlt />
            <span>Sign Out</span>
          </div>
    </div>
    </motion.div>
    </>
  );
};

export default Sidebar;
