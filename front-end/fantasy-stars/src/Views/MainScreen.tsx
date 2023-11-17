import React, { useState } from 'react';
import Card from '../Components/Card'; // Importieren Sie die Card-Komponente
import Footballer from '../Models/footballer';

const MainScreen: React.FC = () => {
    // Beispiel-Daten für Footballer
    const [footballers, setFootballers] = useState<Footballer[]>([
      {
          name: 'Max Müller',
          klub: 'FC Bayern',
          nationalitaet: 'Deutschland',
          alter: 28,
          position: 'Mittelfeld',
          bild: 'url_zum_bild_von_Max',
          marktwert: 7500000
      },
      {
          name: 'John Smith',
          klub: 'Chelsea FC',
          nationalitaet: 'England',
          alter: 24,
          position: 'Stürmer',
          bild: 'url_zum_bild_von_John',
          marktwert: 10000000
      },
      {
          name: 'Pedro Gonzalez',
          klub: 'FC Barcelona',
          nationalitaet: 'Spanien',
          alter: 30,
          position: 'Verteidiger',
          bild: undefined,
          marktwert: 6000000
      },
      {
          name: 'Luca Rossi',
          klub: 'Juventus Turin',
          nationalitaet: 'Italien',
          alter: 27,
          position: 'Torwart',
          bild: undefined,
          marktwert: 5500000
      },
      {
          name: 'Jean Lefebvre',
          klub: 'Paris Saint-Germain',
          nationalitaet: 'Frankreich',
          alter: 22,
          position: 'Stürmer',
          bild: 'url_zum_bild_von_Jean',
          marktwert: 8000000
      }
  ]);
  

  return (
    <div>
        <h1>List of Footballers</h1>
        <div style={{ display: 'flex', overflowX: 'scroll', padding: '10px' }}>
            {footballers.map((footballer, index) => (
                <Card key={index} footballer={footballer} />
            ))}
        </div>
    </div>
);
};

export default MainScreen;