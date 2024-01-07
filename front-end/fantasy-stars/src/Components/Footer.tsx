import React from 'react';
import { Link } from 'react-router-dom';
import '../Stylings/Footer.css';

const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <p>&copy; {new Date().getFullYear()} Fantasy Stars. Alle Rechte vorbehalten. <Link to="/about"> About</Link></p>
        </footer>
    );
};

export default Footer;