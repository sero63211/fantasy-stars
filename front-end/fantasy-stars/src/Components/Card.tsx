import React from 'react';
import Footballer from '../Models/footballer';

interface CardProps {
    footballer: Footballer;
}

const Card: React.FC<CardProps> = ({ footballer }) => {
    return (
        <div style={{ border: '1px solid black', padding: '10px', margin: '10px', textAlign: 'center' }}>
            <div style={{ width: '200px', height: '200px', overflow: 'hidden' }}>
                {footballer.bild ? 
                    <img 
                        src={footballer.bild} 
                        alt={footballer.name} 
                        style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} 
                    /> 
                    : <p>Kein Bild vorhanden!</p>}
            </div>
            <h2>{footballer.name}</h2>
            <p><strong>Klub:</strong> {footballer.klub}</p>
            <p><strong>Alter:</strong> {footballer.alter}</p>
            {/* Weitere Elemente der Karte */}
        </div>
    );
};




export default Card;
