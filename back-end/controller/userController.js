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
}

module.exports = UserController;
