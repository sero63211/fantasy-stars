import React from 'react';
import logo from '../images/fantasy-stars-logo.png'; 
import '../Stylings/Header.css';


const Header: React.FC = () => {
    return (
        <header className="header">
            <h1 >Fantasy Stars</h1>
            <img src={logo} alt="Fantasy Stars Logo" />
        </header>
    );
};

export default Header;
