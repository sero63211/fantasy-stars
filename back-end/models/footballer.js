const mongoose = require("mongoose");

const fotballerSchema = new mongoose.Schema({
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
    }
});

const Footballer = mongoose.model('footballer', fotballerSchema);

module.exports = Footballer;
