const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    userid: String,
    username: String,
    password: String,
});
const User = mongoose.model('user', userSchema);
module.exports = User;