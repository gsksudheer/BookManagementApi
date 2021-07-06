require("dotenv").config();
//Frame Work
const express = require("express");
const { get } = require("http");
const mongoose = require("mongoose");
// const { METHODS } = require("http");


//database
const database = require("./database/index");

//initializing express
const booky = express();

//configuration
booky.use(express.json());

//Establishing DataBase Connection
mongoose.connect(
    "mongodb+srv://sudheer:gsk7Hack@gs.r9cuf.mongodb.net/booky?retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    }
).then(() => console.log("mongodb database connection esatablished"));


//     API:     BOOK  

/* 
Route           :   /
Description     :   getting all the books
Access          :   public
Parameters      :   N
Method          :   get
}*/
booky.get("//", (req, res) => {
    return res.json({ books: database.books });
});

/* 
Route           :   /is
Description     :   get specific book based on the isbn 
Access          :   public
Parameters      :   isbn
Methos          :   get
*/

booky.get("/is/:isbn", (req, res) => {
    const getspecificbook = database.books.filter((book) => book.ISBN === req.params.isbn);

    if (getspecificbook.length === 0) {
        return res.json({
            error: `no book for the specified isbn ${req.params.isbn}`
        });
    } else {
        return res.json({ books: getspecificbook });
    }

});

/* 
Route           :   /c
Description     :   get specific book based on the category 
Access          :   public
Parameters      :   category
Methos          :   get
*/
booky.get("/c/:category", (req, res) => {
    const getspecificbook = database.books.filter((book) => book.category.includes(req.params.category));
    console.log(getspecificbook);
    if (getspecificbook.length === 0) {
        return res.json({ error: `book not found for the specified category ${req.params.category}` });
    } else {
        return res.json({ books: getspecificbook });
    }
});

/* 
Route           :   /book/specific
Description     :   get specific book based on the authorid 
Access          :   public
Parameters      :   authorid
Methos          :   get
*/
booky.get('/book/specific/:authorid', (req, res) => {
    const getspecificbook = database.books.filter((book) => book.authors.includes(parseInt(req.params.authorid)));
    if (getspecificbook.length === 0) {
        return res.json({ error: `book not found for the specifies author id${req.params.authorid}` });
    } else {
        return res.json({ books: getspecificbook });
    }
});

/*
Route           :   /lan
Descripton      :   to get a specific books based on the language
Access          :   public
Parameters      :   language
Method          :   GET
*/
booky.get('/lang/:language', (req, res) => {
    const getspecificbook = database.books.filter((book) => book.language == req.params.language);
    if (getspecificbook.length === 0) {
        return res.json({ error: `book not found for the specifies ${req.params.language} language` });
    } else {
        return res.json({ books: getspecificbook });
    }
});

/* 
Route           :   /book/newbook
Description     :   get all books
Access          :   public
Parameters      :   None
Methos          :   POST
*/

booky.post('/book/newbook', (req, res) => {
    const { newBook } = req.body;
    database.books.push(newBook);
    return res.json({ books: database.books, message: "book added *_*" });

});

/* 
Route           :   /book/update/title
Description     :   to update the title of the book
Access          :   public 
Parameter       :   isbn
Method          :   PUT
*/
booky.put("/book/update/title/:isbn", (req, res) => {
    database.books.forEach((book) => {
        if (book.ISBN === req.params.isbn) {
            book.title = req.body.bookTitle;
            return;
        }
    });

    return res.json({ books: database.books });
});

booky.put('/book/update/author/:isbn/:authorid', (req, res) => {
    database.books.forEach((book) => {
        if (book.category.ISBN === req.params.isbn) {
            books.authors.push(req.params.authorid);
        }
    });
    database.authors.forEach((author) => {
        if (author.id === req.params.id) {
            author.books.push(req.params.isbn);
        }
    });
});

/* 
Route           :   /book/update/author
Description     :   to update the author in the book
Access          :   Public
Parameter       :   isbn, authorId
Method          :   PUT
*/
booky.put("/book/update/author/:isbn/:authorId", (req, res) => {
    //update the bookdatase
    database.books.forEach((book) => {
        if (book.ISBN === req.params.isbn) {
            return book.authors.push(parseInt(req.params.authorId));
        }
    });


    //update the author database
    database.authors.forEach((author) => {
        if (author.id === req.params.authorId)
            return author.books.push(req.params.isbn);
    });

    return res.json({ books: database.books, author: database.authors, message: "new author added successfully" });

});


/* 
Route           :   /book/delete
Description     :   to delete a book
Access          :   Public
Parameters      :   isbn
Method          :   DELETE  
*/
booky.delete("/book/deletebook/:isbn", (req, res) => {
    const updatebookdata = database.books.filter((book) => book.ISBN !== req.params.isbn);
    database.books = updatebookdata;
    return res.json({ books: database.books });
});

/*  
Route           :   /book/delete
Description     :   to delete an author from the book
Access          :   Public
Parameters      :   authorid
Method          :   DELETE  
*/
booky.delete("/book/deleteauthor/:isbn/:authorid", (req, res) => {
    //update the book database
    database.books.forEach((book) => {
        if (book.ISBN === req.params.isbn) {
            const updatedbookdata = book.authors.filter((author) => author !== parseInt(req.params.authorid));
            console.log(updatedbookdata + "bookdb");
            book.authors = updatedbookdata;
            return;
        }
    });

    //update the author database
    database.authors.forEach((author) => {
        if (author.id === parseInt(req.params.authorid)) {
            const updatedauthordata = author.books.filter((book) => book !== req.params.isbn);
            console.log(updatedauthordata + "authordb");
            author.books = updatedauthordata;
            return;
        }
    });

    return res.json({
        books: database.books,
        authors: database.authors,
        message: "successfully deleted the author from the book",
    });
});





//      ^--     API:  Author    --^

/*
Route           :   /author
Description     :   get all authors
Access          :   public
Parameters      :   None
Methos          :   get
*/
booky.get('/author', (req, res) => {
    return res.json({ books: database.authors });
});


/* 
Route           :   /author
Description     :   get an author using id
Access          :   public
Parameters      :   id
Methos          :   get
*/
booky.get('/author/:id', (req, res) => {
    const getSpecificAuthor = database.authors.filter((author) => author.id === parseInt(req.params.id));
    return res.json({ authors: getSpecificAuthor });
});

/*
Route           :   /author
Description     :   to get an author based on the book name
Access          :   public
Parameters      :   /bookisbn
Method          :   GET
*/
booky.get('/author/:bookname', (req, res) => {
    const getSpecificAuthor = database.authors.filter((author) => author.books.includes(req.params.bookname));
    if (getSpecificAuthor.length === 0) {
        console.log("error arised");
        return res.json({ error: `author not found for the specified bookid ${req.params.bookisbn}` });
    } else {
        return res.json({ authors: getSpecificAuthor });
    }
});
/* shapeAI.get("/author/:isbn", (req, res) => {
    const getSpecificAuthors = database.authors.filter((author) =>
        author.books.includes(req.params.isbn)
    );

    if (getSpecificAuthors.length === 0) {
        return res.json({
            error: `No author found for the book ${req.params.isbn}`,
        });
    }

    return res.json({ authors: getSpecificAuthors });
}); */

/* 
Route           :   /author
Description     :   add new authors
Access          :   public
Parameters      :   None
Methos          :   POST
*/

booky.post('/author/newauthor', (req, res) => {
    const { newAuthor } = req.body;
    database.books.push(newAuthor);
    return res.json({ Authors: database.authors, message: "author added *_*" });

});
/* 
Route           :   /author/update
Description     :   update authors name using id
Access          :   public
Parameters      :   authorid, authorname
Methos          :   PUT
*/
booky.put('/author/update/:autherid/:authorname', (req, res) => {
    //update the author database
    database.authors.forEach((author) => {
        if (author.id === req.params.id) {
            author.name = req.params.authorname;
        }
    });
    return res.json({ author: authors, message: "author name updatees" });
});


/*
Route           /book/author/update
Description     update/add new author
Access          PUBLIC
Parameters      isbn
Method          PUT
*/
booky.put("/book/author/update/:isbn", (req, res) => {
    // update the book database
    database.books.forEach((book) => {
        if (book.ISBN === req.params.isbn)
            return book.authors.push(req.body.newAuthor);
    });

    // update the author database
    database.authors.forEach((author) => {
        if (author.id === req.body.newAuthor)
            return author.books.push(req.params.isbn);
    });

    return res.json({
        books: database.books,
        authors: database.authors,
        message: "New author was added 🚀",
    });
});
/*
Route           /author/delete/
Description     delete an author 
Access          PUBLIC
Parameters      authorid
Method          DELETE
*/
booky.delete("/author/delete/id/:authorid", (req, res) => {
    var updatedauthordata = database.authors.filter((author) => author.id !== parseInt(req.params.authorid));

    database.authors = updatedauthordata;
    console.log(updatedauthordata);
    return res.json({ authors: database.authors, message: `author with id ${req.params.authorid} deleted successfull 🚀` });

});








//API:  Publication
/* 
Route           :   /pub
Description     :   get all publicationd
Access          :   public
Parameters      :   None
Methos          :   get
*/
booky.get('/pub', (req, res) => {
    return res.json({ publications: database.publications });
});


/* 
Route           :   /pub
Description     :   get an publication based on id
Access          :   public
Parameters      :   id
Methos          :   get
*/
booky.get('/pub/:id', (req, res) => {
    const getSpecificPublication = database.publications.filter((publication) => publication.id === parseInt(req.params.id));
    return res.json({ publications: getSpecificPublication });
});

/*
Route           :   /author
Description     :   to get an author based on the book name
Access          :   public
Parameters      :   /bookisbn
Method          :   GET
*/
booky.get('/pub/li/bookname', (req, res) => {
    const getSpecificPublication = database.publications.filter((publication) => publication.books.includes(req.params.bookname));
    if (getSpecificPublication.length === 0) {
        console.log("entered1");
        return res.json({ error: getSpecificPublication });
    } else {
        console.log("entered2");
        return res.json({ publication: getSpecificPublication });
    }
});

/* 
Route           :   /pub
Description     :   add new publication
Access          :   public
Parameters      :   None
Methos          :   POST
*/

booky.post('/pub/newpub', (req, res) => {
    const { newPublication } = req.body;
    database.books.push(newPublication);
    return res.json({ publications: database.publications, message: "publictions added *_*" });

});


/* 
Route           :   /publication/update/book
Description     :   update/add a book to a  publication
Access          :   public
Parameters      :   isbn
Methos          :   PUT
*/

booky.put('/publication/update/book/:isbn', (req, res) => {
    //update the publication database
    database.publications.forEach((publication) => {
        if (publication.id === req.body.pubid) {
            return publication.books.push(req.params.isbn);
        }
    });
    //update the book database
    database.book.forEach((book) => {
        if (book.ISBN === req.params.isbn) {
            book.publication = req.body.pubid;
            return;
        }
    });
    return resizeBy.json({ books: database.books, publication: database.publications, message: "publication updates successfully" });
});
/*
Route           /publication/delete/
Description     delete a publication 
Access          PUBLIC
Parameters      authorid
Method          DELETE
*/
booky.delete("/publication/delete/:publicationid", (req, res) => {

    const updatedpublicationdata = database.publications.filter((publication) => publication.id !== parseInt(req.params.publicationid));

    database.publications = updatedpublicationdata;
    return res.json({ publications: database.publications, message: "publication deleted successfully" });

});
/* 
Route           /publication/deletepublication/
Description     delete a publication 
Access          PUBLIC
Parameters      publicationid
Method          DELETE
*/
booky.delete("/publication/deletepublication/:publicationid/:isbn", (req, res) => {
    //update book database
    database.books.forEach((book) => {

        if (book.publication.filter((pub) => pub === parseInt(req.params.publicationid))) {
            const updatedPublicationData = book.publication.filter((pub) => pub !== parseInt(req.params.publicationid));
            console.log(updatedPublicationData + "data");
            book.publication = updatedPublicationData;
            return;
        }
    });


    //update publication database
    database.publications.forEach((publication) => {
        if (publication.id === parseInt(req.params.publicationid)) {
            const updatedPublicationData = publication.books.filter((book) => book !== req.params.isbn);
            publication.books = updatedPublicationData;
            return;
        }
    });

    return res.json({ books: database.books, publications: database.publications, message: "publication delted succcessfully delted from the book" });

});



booky.listen(3000, () => console.log("servier runing 🚀 🚀 🚀 🚀 🚀"));