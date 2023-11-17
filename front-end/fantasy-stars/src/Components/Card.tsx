import React from 'react';
import Footballer from '../Models/footballer';

interface CardProps {
    footballer: Footballer;
}

const Card: React.FC<CardProps> = ({ footballer }) => {
    return (
        <div style={{ border: '1px solid black', padding: '10px', margin: '10px', textAlign: 'center' }}>
            {footballer.bild ? <img src={footballer.bild} alt={footballer.name} style={{ maxWidth: '100%' }} /> : <p>Kein Bild vorhanden!</p>}
            <h2>{footballer.name}</h2>
            <p><strong>Klub:</strong> {footballer.klub}</p>
            <p><strong>Alter:</strong> {footballer.alter}</p>
            {/* Anzeige der Nationalität als Bild - Beispiel-URL einfügen oder Logik zur Bildermittlung hinzufügen */}
            <img src={`url_zur_nationalitätsflagge/${footballer.nationalitaet}.png`} alt={`Flagge von ${footballer.nationalitaet}`} style={{ maxWidth: '50px' }} />
        </div>
    );
};

export default Card;
