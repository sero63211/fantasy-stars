const mongoose = require("mongoose");

const fotballerSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    klub: {
        type: String,
        required: true
    },
    nationalitaet: {
        type: String,
        required: true
    },
    alter: {
        type: Number,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    bild: {
        type: String, 
        required: false 
    },
    marktwert: {
        type: Number,
        required: true
    },
    likes: {
        type: Number,
        required: false
    }
});

const Footballer = mongoose.model('footballer', fotballerSchema);

module.exports = Footballer;
