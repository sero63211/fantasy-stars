const User = require("../models/user");
const bcrypt = require("bcrypt");

class UserController {
    static async handleLogin(req, res) {
        try {
            const { username, password } = req.body;

            const user = await User.findOne({ username });

            if (!user) {
                return res.status(401).send('Unauthorized');
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (!isPasswordValid) {
                return res.status(401).send('Unauthorized');
            }

            res.status(200).send('Ok');
        } catch (error) {
            res.status(500).send('Internal Server Error');
        }
    }

    static async createUser(req, res) {
        try {
            const { username, password } = req.body;

            // Überprüfen, ob der Benutzername bereits existiert
            const existingUser = await User.findOne({ username });
            if (existingUser) {
                return res.status(400).send('Username already exists');
            }

            // Passwort hashen
            const hashedPassword = await bcrypt.hash(password, 10);

            // Neuen Benutzer mit dem Modell erstellen
            const newUser = new User({
                username,
                password: hashedPassword
            });

            // Neuen Benutzer in die Datenbank speichern
            await newUser.save();

            res.status(201).send('User created');
        } catch (error) {
            res.status(500).send('Internal Server Error');
        }
    }
}


module.exports = UserController;
