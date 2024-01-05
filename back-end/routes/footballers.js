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

    router.post("/create", FootballPlayerController.createFootballers);

    router.get("/getAllFootballers", (req, res) => {
        FootballPlayerController.getAllFootballers(req,res);
    });

    router.delete("/deleteAllFootballers", (req, res) => {
        FootballPlayerController.deleteAllFootballers(req,res);
    });

    router.delete('/deleteFootballer/:id', FootballPlayerController.deleteFootballerById);


    router.put('/updateFootballers/:id', FootballPlayerController.updateFootballer);

    router.put('/likes/:id', FootballPlayerController.incrementUserLikes);
    
    router.put('/dislikes/:id', FootballPlayerController.decrementUserLikes);


});

module.exports = router;