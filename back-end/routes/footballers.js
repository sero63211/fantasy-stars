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

    router.post("/create", (req, res) => {
        FootballPlayerController.createFotballer(req,res);
    });

    router.get("/getAllFootballers", (req, res) => {
        FootballPlayerController.getAllFootballers(req,res);
    });

});

module.exports = router;