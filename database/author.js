const mongoose = require("mongoose");

//Creating Author Schema
const AuthorSchema = mongoose.Schema({
    id: Number,
    name: String,
    books: [String],
});

//create Author Model
const AuthorModel = mongoose.model("authors", AuthorSchema);

module.exports = AuthorModel;