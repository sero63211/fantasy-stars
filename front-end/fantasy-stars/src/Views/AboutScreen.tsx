import React from 'react';
import backgroundImage from '../images/Football_field.svg.png';
import Footer from '../Components/Footer';

const AboutScreen: React.FC = () => {
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
                <h2 className="edit-detail-title">Über Fantasy Stars</h2>
                <p>
                    Fantasy Stars ist eine revolutionäre Plattform, die es Fußballfans ermöglicht, ihre Traummannschaften zusammenzustellen, unabhängig von Ländergrenzen oder Clubzugehörigkeiten. Hier haben Sie die Freiheit, Spieler aus der ganzen Welt zu wählen und einzigartige Teams zu kreieren. Sie können Spieler nach Ihren Vorstellungen gestalten, ihre Altersgruppen, Nationalitäten und sogar Marktwerte anpassen. Es ist Ihre Chance, das Spiel zu leiten und die ultimative Mannschaft zusammenzustellen, die die Welt des Fußballs noch nie gesehen hat. Treten Sie ein in eine Welt, in der Ihre Fußballfantasien Realität werden.
                </p>
            </div>
            <Footer />
        </div>
    );
};

export default AboutScreen;