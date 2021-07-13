const mongoose = require("mongoose");

// Creating Book schema
const BookSchema = mongoose.Schema({
    ISBN: String,
    title: String,
    language: String,
    pubDate: String,
    numOfPages: Number,
    authors: [Number],
    category: [String],
    publication: [Number],
});

//Create a Book Model
const BookModel = mongoose.model("books", BookSchema);

module.exports = BookModel;