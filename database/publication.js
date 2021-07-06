const mongoose = require("mongoose");

//CreatingPublication Schema
const PublicationSchema = mongoose.Schema({
    id: Number,
    name: String,
    books: [String],
});

//createPublication Model
const PublicationModel = mongoose.model(AuthorSchema);

module.exports = PublicationModel;