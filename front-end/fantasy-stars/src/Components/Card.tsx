import React, { useEffect, useState } from 'react';
import Footballer from '../Models/footballer';
import heartIcon from '../images/heart.png';
import heartFillIcon from '../images/heart.fill.png';

interface CardProps {
    footballer: Footballer;
    onCardChange: () => void; 
}

const Card: React.FC<CardProps> = ({ footballer, onCardChange }) => {
    const [isHeartFilled, setIsHeartFilled] = useState(false);

    useEffect(() => {
        const liked = localStorage.getItem(`liked-${footballer.id}`);
        setIsHeartFilled(liked === 'true');
        console.log(`[useEffect] Initialer Zustand von isHeartFilled für ${footballer.name}:`, liked === 'true');
    }, [footballer.id]);

    const updateLikes = async (increment: boolean) => {
        const endpoint = `http://localhost:3001/footballer/${increment ? 'likes' : 'dislikes'}/${footballer.id}`;
        console.log(`[updateLikes] Senden einer Anfrage an: ${endpoint}`);

        try {
            const response = await fetch(endpoint, { method: 'PUT' });
            console.log('[updateLikes] Response:', response);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            onCardChange(); 
        } catch (error) {
            console.error("[updateLikes] Fehler beim Aktualisieren der Likes:", error);
        }
    };

    const handleHeartClick = async () => {
        const newHeartFilledState = !isHeartFilled;
        console.log(`[handleHeartClick] Benutzer hat auf Herz geklickt. Neuer Zustand: ${newHeartFilledState}`);

        setIsHeartFilled(newHeartFilledState);
        await updateLikes(newHeartFilledState); 
        localStorage.setItem(`liked-${footballer.id}`, newHeartFilledState.toString());
        console.log(`[handleHeartClick] LocalStorage aktualisiert für ${footballer.name}:`, newHeartFilledState);

        onCardChange();
    };
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
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img 
                    src={isHeartFilled ? heartFillIcon : heartIcon} 
                    alt="Herz" 
                    style={{ cursor: 'pointer', width: '24px', height: '24px' }} 
                    onClick={handleHeartClick} 
                />
                <span style={{ marginLeft: '10px' }}>Gefällt {footballer.likes} mal</span>
            </div>
        </div>
    );
};




export default Card;
