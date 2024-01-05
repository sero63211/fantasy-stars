const mongoose = require("mongoose");

const fotballerSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false
    },
    klub: {
        type: String,
        required: false
    },
    nationalitaet: {
        type: String,
        required: false
    },
    alter: {
        type: Number,
        required: false
    },
    position: {
        type: String,
        required: false
    },
    bild: {
        type: String, 
        required: false 
    },
    marktwert: {
        type: Number,
        required: false
    },
    likes: {
        type: Number,
        required: false
    }
});

const Footballer = mongoose.model('footballer', fotballerSchema);

module.exports = Footballer;