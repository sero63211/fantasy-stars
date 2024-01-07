import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../images/fantasy-stars-logo.png';
import '../Stylings/Header.css';

const Header: React.FC = () => {
    const navigate = useNavigate();

    return (
        <header className="header" onClick={() => navigate('/')}>
            <h1>Fantasy Stars</h1>
            <img src={logo} alt="Fantasy Stars Logo" />
        </header>
    );
};

export default Header;