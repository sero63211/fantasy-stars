import React, { useEffect, useState } from 'react';
import Card from '../Components/Card'; // Importieren Sie die Card-Komponente
import Footballer from '../Models/footballer';

const MainScreen: React.FC = () => {

    const [footballers, setFootballers] = useState<Footballer[]>([]);

    const fetchFootballers = async () => {
        try {
            const response = await fetch('http://localhost:3001/footballer/getAllFootballers');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setFootballers(data);
        } catch (error) {
            console.error("Fehler beim Abrufen der Fußballspieler:", error);
        }
    }
    useEffect(() => {
        fetchFootballers();
    }, []);

    const handleCardChange = () => {
        fetchFootballers(); 
    };
  

    return (
        <div>
            <h1>List of Footballers</h1>
            <div style={{ display: 'flex', overflowX: 'scroll', padding: '10px' }}>
                {footballers.map((footballer, index) => (
                <Card key={index} footballer={footballer} onCardChange={handleCardChange} />
                ))}
            </div>
        </div>
    );
};

export default MainScreen;