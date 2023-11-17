const Footballer = require('../models/footballer.js'); 

class FootballPlayerController {

    static async createFotballer(req, res) {
        try {
    
            // Erstellen eines neuen Fotballer-Objekts mit den Daten aus req.body
            const newFotballer = new Footballer({
                name: req.body.name,
                klub: req.body.klub,
                nationalitaet: req.body.nationalitaet,
                alter: req.body.alter,
                position: req.body.position,
                bild: req.body.bild,
                marktwert: req.body.marktwert
            });
    
            // Speichern des neuen Fotballers in der Datenbank
            const savedFotballer = await newFotballer.save();
    
            // Senden einer Antwort zurück an den Client
            res.status(201).json(savedFotballer);
        } catch (error) {
            console.error("Fehler beim Speichern des Fotballers:", error.message);
            // Fehlerbehandlung, wenn beim Speichern ein Problem auftritt
            res.status(400).json({ message: error.message });
        }
    }


    static async getAllFootballers(req, res) {
        try {
            // Abrufen aller Fußballspieler aus der Datenbank
            const footballers = await Footballer.find({});

            // Senden der abgerufenen Fußballspieler zurück an den Client
            res.status(200).json(footballers);
        } catch (error) {
            console.error("Fehler beim Abrufen der Fußballspieler:", error.message);
            // Fehlerbehandlung, wenn beim Abrufen ein Problem auftritt
            res.status(500).json({ message: error.message });
        }
    }
}
    

module.exports = FootballPlayerController;
