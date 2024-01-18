const Footballer = require('../models/footballer.js'); 
const { v4: uuidv4 } = require('uuid');

class FootballPlayerController {

    static async createFootballers(req, res) {
        try {
            // Stellen Sie sicher, dass req.body ein Array ist
            if (!Array.isArray(req.body)) {
                return res.status(400).json({ message: 'Erwartet ein Array von Fußballspielern.' });
            }
    
            // Hinzufügen einer UUID zu jedem Fußballspieler und Entfernen unerwünschter Felder
            const footballersData = req.body.map(({ _id, __v, ...footballer }) => ({
                ...footballer,
                id: uuidv4() // Fügen Sie hier die UUID hinzu
            }));
    
            // Einfügen der Fußballspieler in die Datenbank
            const savedFootballers = await Footballer.insertMany(footballersData);
    
            // Senden einer Antwort zurück an den Client
            res.status(201).json(savedFootballers);
        } catch (error) {
            console.error("Fehler beim Speichern der Fußballspieler:", error.message);
            // Fehlerbehandlung, wenn beim Speichern ein Problem auftritt
            res.status(500).json({ message: error.message });
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

    static async updateFootballer(req, res) {
        try {
            const { id } = req.params; // ID des Fußballspielers aus den URL-Parametern extrahieren
            const updateData = req.body; // Aktualisierungsdaten aus dem Request-Body extrahieren

            // Fußballspieler finden und aktualisieren
            const updatedFootballer = await Footballer.findOneAndUpdate(
                { id: id }, // Kriterium für die Suche nach dem Fußballspieler
                updateData, // Aktualisierungsdaten
                { new: true } // Gibt das aktualisierte Dokument zurückzurückzurück≥≥
            );

            if (!updatedFootballer) {
                return res.status(404).json({ message: 'Fußballspieler nicht gefunden.' });
            }

            // Senden des aktualisierten Fußballspielers zurück an den Client
            res.status(200).json(updatedFootballer);
        } catch (error) {
            console.error("Fehler beim Aktualisieren des Fußballspielers:", error.message);
            res.status(500).json({ message: error.message });
        }
    }

    static async deleteAllFootballers(req, res) {
        try {
            // Löschen aller Fußballspieler in der Datenbank
            await Footballer.deleteMany({});
    
            // Senden einer Bestätigung zurück an den Client
            res.status(200).json({ message: 'Alle Fußballspieler wurden erfolgreich gelöscht.' });
        } catch (error) {
            console.error("Fehler beim Löschen der Fußballspieler:", error.message);
            // Fehlerbehandlung, wenn beim Löschen ein Problem auftritt
            res.status(500).json({ message: error.message });
        }
    }

    static async deleteFootballerById(req, res) {
        try {
          const { id } = req.params;
          const result = await Footballer.findOneAndDelete({ id });
      
          if (result) {
            res.status(200).json({ message: `Fußballspieler mit der ID ${id} wurde erfolgreich gelöscht.` });
          } else {
            res.status(404).json({ message: `Fußballspieler mit der ID ${id} nicht gefunden.` });
          }
        } catch (error) {
          console.error("Fehler beim Löschen des Fußballspielers:", error.message);
          res.status(500).json({ message: error.message });
        }
      }
      
      
    static async incrementUserLikes(req, res) {
        try {
            const { id } = req.params; // ID aus den URL-Parametern extrahieren

            // Fußballspieler finden und userLikes inkrementieren
            const updatedFootballer = await Footballer.findOneAndUpdate(
                { id: id }, // Kriterium für die Suche nach dem Fußballspieler
                { $inc: { likes: 1 } }, // Erhöhung der userLikes um 1
                { new: true } // Gibt das aktualisierte Dokument zurück
            );

            if (!updatedFootballer) {
                return res.status(404).json({ message: 'Fußballspieler nicht gefunden.' });
            }

            // Senden des aktualisierten Fußballspielers zurück an den Client
            res.status(200).json(updatedFootballer);
        } catch (error) {
            console.error("Fehler beim Inkrementieren der UserLikes:", error.message);
            res.status(500).json({ message: error.message });
        }
    }

    static async decrementUserLikes(req, res) {
        try {
            const { id } = req.params; // ID aus den URL-Parametern extrahieren

            // Fußballspieler finden und userLikes dekrementieren
            const updatedFootballer = await Footballer.findOneAndUpdate(
                { id: id }, // Kriterium für die Suche nach dem Fußballspieler
                { $inc: { likes: -1 } }, // Verringerung der userLikes um 1
                { new: true } // Gibt das aktualisierte Dokument zurück
            );

            if (!updatedFootballer) {
                return res.status(404).json({ message: 'Fußballspieler nicht gefunden.' });
            }

            // Senden des aktualisierten Fußballspielers zurück an den Client
            res.status(200).json(updatedFootballer);
        } catch (error) {
            console.error("Fehler beim Dekrementieren der UserLikes:", error.message);
            res.status(500).json({ message: error.message });
        }
    }
}
    

module.exports = FootballPlayerController;