import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../images/fantasy-stars-logo.png';
import '../Stylings/Header.css';
import { useAuth } from "../AuthentificationState";


const Header: React.FC = () => {
    const { loggedIn, setLoggedIn } = useAuth();
    const navigate = useNavigate();


    const handleLogoutClick = () => {
        setLoggedIn(false);
    };


    const handleLoginClick = () => {
      navigate(`/login`, {});
    };

    return (
        <header className="header">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <h1>Fantasy Stars</h1>
            <img src={logo} alt="Fantasy Stars Logo" />
          </div>
    
            {loggedIn == 
            false ? 
              <button className="login" onClick={handleLoginClick}>Login</button>
            : <button className="logout" onClick={handleLogoutClick}>Logout</button>
            }
        </header>
    );
};

export default Header;