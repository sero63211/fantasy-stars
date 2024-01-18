import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../images/fantasy-stars-logo.png';
import '../Stylings/Header.css';

const Header: React.FC = () => {
    const navigate = useNavigate();
    const [userStatus, setUserStatus] = useState<'login' | 'logout'>('logout');


    const handleLogoutClick = () => {
        // Hier kannst du die Logik für den Logout implementieren
        // Zum Beispiel: Löschen von Authentifizierungstokens
        // Wenn erfolgreich, setze den Benutzerstatus auf 'logout'
        setUserStatus('logout');
    };


    const handleLoginClick = () => {
        navigate(`/login`, {
         
          });      };

    return (
        <header className="header">
            <h1>Fantasy Stars</h1>
            <img src={logo} alt="Fantasy Stars Logo" />
    
            {userStatus === 'logout' && (
                <button className="login" onClick={handleLoginClick}>Login</button>
            )}
            {userStatus === 'login' && (
                <button className="logout" onClick={handleLogoutClick}>Logout</button>
            )}
        </header>
    );
};

export default Header;
