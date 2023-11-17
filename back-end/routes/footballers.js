const express = require("express");
const router = express.Router();
const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();

const FootballPlayerController = require("../controller/FootballPlayerController.js");

MongoClient.connect(process.env.MONGODB_URI, (err, client) => {
    if (err) {
        console.error(err);
        return;
    }

    const db = client.db("fantasy-stars");

    // Login-Endpoint
    router.post("/create", (req, res) => {
        FootballPlayerController.createFotballer(req,res);
    });


});

module.exports = router;