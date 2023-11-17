const Fotballer = require('../models/footballer.js'); 

class FootballPlayerController {

    // Funktion, um einen neuen Fotballer zu erstellen
    static async createFotballer(req, res) {
        try {
            console.log("Erhaltenes Request-Objekt:", req.body);
    
            // Erstellen eines neuen Fotballer-Objekts mit den Daten aus req.body
            const newFotballer = new Fotballer({
                name: req.body.name,
                klub: req.body.klub,
                nationalitaet: req.body.nationalitaet,
                alter: req.body.alter,
                position: req.body.position,
                bild: req.body.bild,
                marktwert: req.body.marktwert
            });
    
            console.log("Neues Fotballer-Objekt vor dem Speichern:", newFotballer);
    
            // Speichern des neuen Fotballers in der Datenbank
            const savedFotballer = await newFotballer.save();
    
            console.log("Gespeichertes Fotballer-Objekt:", savedFotballer);
    
            // Senden einer Antwort zurück an den Client
            res.status(201).json(savedFotballer);
        } catch (error) {
            console.error("Fehler beim Speichern des Fotballers:", error.message);
            // Fehlerbehandlung, wenn beim Speichern ein Problem auftritt
            res.status(400).json({ message: error.message });
        }
    }
}
    

module.exports = FootballPlayerController;
