import React from 'react';
import { useLocation } from 'react-router-dom';
import backgroundImage from '../images/Football_field.svg.png';

const ErrorDisplay: React.FC = () => {
    const location = useLocation();
    const message = location.state?.message; 
    return (
        <div
            className="edit-detail-container"
            style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
        >
            <div className="edit-form-container">
                <h2 className="edit-detail-title" style={{ color: 'red', textAlign: 'center' }}>Kein Fehler</h2>
                <p style={{ color: 'red', textAlign: 'center', fontSize: '20px', fontWeight: 'bold' }}>
                    {message}
                </p>
            </div>
        </div>
    );
};

export default ErrorDisplay;