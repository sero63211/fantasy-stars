const express = require("express");
const router = express.Router();
const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();

const UserController = require("../controller/userController.js");

MongoClient.connect(process.env.MONGODB_URI, (err, client) => {
    if (err) {
        console.error(err);
        return;
    }

    const db = client.db("fantasy-stars");

    // Login-Endpoint
    router.post("/login", (req, res) => {
        UserController.handleLogin(req, res, db);
    });

    // Benutzererstellungs-Endpoint
    router.post("/registration", (req, res) => {
        UserController.createUser(req, res, db);
    });

});

module.exports = router;
