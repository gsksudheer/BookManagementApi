require("dotenv").config();
//Frame Work
const express = require("express");
const { get } = require("http");
const mongoose = require("mongoose");
// const { METHODS } = require("http");


//DataBase
const database = require("./database/index");

//Models
const BookModel = require("./database/book");
const AuthorModel = require("./database/author");
const PublicationModel = require("./database/publication");

//MicroServices Routes
const Books = require("./API/Book/index");
const Authors = require("./API/Author/index");
const Publications = require("./API/Publications/index")

//Initializing Express
const booky = express();

//Configuration
booky.use(express.json());

//Establishing DataBase Connection
mongoose.connect(
    process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    }
).then(() => console.log("mongodb database connection esatablished"));

//Initializing Microservices
booky.use("/book", Books);
booky.use("/author", Authors);
booky.use("/publication", Publications);


booky.listen(3000, () => console.log("servier runing "));