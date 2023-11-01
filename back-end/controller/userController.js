// Importieren Sie das Mongoose-Modell
const User = require("../models/users");

class UserController {
    static async handleLogin(req, res) {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.send({
                success: false,
                message: "Username and password are required",
            });
        }

        try {
            // Verwenden Sie das User-Modell, um die Datenbank abzufragen
            const user = await User.findOne({ username: username });
            if (!user) {
                return res.status(401).send({ success: false, message: "Invalid username or password" });
            }

            if (password === user.password) {
                // Authentifizierung erfolgreich
                res.status(200).send({
                    success: true,
                    message: "Login successful",
                    user: {
                        firstname: user.username,
                    },
                });
            } else {
                // Falsches Passwort
                res.send({ success: false, message: "Invalid username or password" });
            }
        } catch (err) {
            // Fehlerbehandlung
            return res.status(500).send("Error occurred while trying to login");
        }
    }

    static async createUser(req, res) {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).send({
                success: false,
                message: "Username and password are required",
            });
        }

        try {
            // Überprüfen, ob der Benutzer bereits existiert
            const existingUser = await User.findOne({ username: username });
            if (existingUser) {
                return res.status(400).send({
                    success: false,
                    message: "Username already exists",
                });
            }

            // Neuen Benutzer erstellen
            const newUser = new User({ username, password });
            const savedUser = await newUser.save();

            // Benutzer erfolgreich erstellt
            res.status(201).send({
                success: true,
                message: "User created successfully",
                userId: savedUser._id,
            });
        } catch (err) {
            // Fehlerbehandlung
            console.error(err);
            return res.status(500).send("Error occurred while trying to create user");
        }
    }
}

module.exports = UserController;
