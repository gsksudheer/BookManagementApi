//prefix : /book

//initializing the express Route
const Router = require("express").Router();

//DataBase Book Model
const BookModel = require("../../database/book");


//     API:     BOOK  

/* 
Route           :   /
Description     :   getting all the books
Access          :   public
Parameters      :   N
Method          :   get
}*/
Router.get("/", async(req, res) => {
    const getAllBooks = await BookModel.find();
    console.log(getAllBooks);
    return res.json({ books: getAllBooks });
});


/* 
Route           :   /is
Description     :   get specific book based on the isbn 
Access          :   public
Parameters      :   isbn
Methos          :   get
*/

Router.get("/specificbook/:isbn", async(req, res) => {
    const getSpecificBook = await BookModel.findOne({ ISBN: req.params.isbn });



    //  const getSpecificBook = database.books.filter((book) => book.ISBN === req.params.isbn);

    if (!getSpecificBook) {
        return res.json({
            error: `no book for the specified isbn ${req.params.isbn}`
        });
    } else {
        return res.json({ books: getSpecificBook });
    }

});

/* 
Route           :   /c
Description     :   get specific book based on the category 
Access          :   public
Parameters      :   category
Methos          :   get
*/
Router.get("/category/:category", async(req, res) => {
    const getSpecificBook = await BookModel.findOne({
        category: req.params.category,
    })

    /* const getspecificbook = database.books.filter((book) => book.category.includes(req.params.category));
    console.log(getspecificbook); */
    if (!getSpecificBook) {
        return res.json({
            error: `book not found for the specified category ${req.params.category}`
        });
    } else {
        return res.json({
            books: getSpecificBook
        });
    }
});

/* 
Route           :   /book/specific
Description     :   get specific book based on the authorid 
Access          :   public
Parameters      :   authorid
Methos          :   get
*/
Router.get('/specificbook/:authorid', async(req, res) => {
    const getSpecificBook = await BookModel.findOne({
        authors: req.params.authorid
    });

    //const getspecificbook = database.books.filter((book) => book.authors.includes(parseInt(req.params.authorid)));
    if (!getSpecificBook) {
        return res.json({
            error: `book not found for the specifies author id${req.params.authorid}`
        });
    } else {
        return res.json({
            books: getSpecificBook
        });
    }
});

/*
Route           :   /book/language
Descripton      :   to get a specific books based on the language
Access          :   public
Parameters      :   language
Method          :   GET
*/
Router.get('/language/:language', async(req, res) => {
    const getSpecificBook = await BookModel.findOne({
        language: req.params.language
    });
    // const getSpecificBook = database.books.filter((book) => book.language == req.params.language);
    if (!getSpecificBook) {
        return res.json({
            error: `book not found for the specifies ${req.params.language} language`
        });
    } else {
        return res.json({
            books: getSpecificBook
        });
    }
});

/* 
Route           :   /book/addnewbook
Description     :   add a new books
Access          :   public
Parameters      :   None
Methos          :   POST
*/

Router.post('/addnewbook', async(req, res) => {
    const { newBook } = req.body;
    const newd = req.body.newBook;

    let addNewBook = await BookModel.create(newd);


    //database.books.push(addNewBook);
    return res.json({
        books: addNewBook,
        message: "book added *_*"
    });

});

Router.post("/book/new", async(req, res) => {
    const { newBook } = req.body;

    BookModel.create(newBook);

    return res.json({
        message: "book was added!"
    });
});

/* 
Route           :   /book/updatebooktitle
Description     :   to update the title of the book
Access          :   public 
Parameter       :   isbn
Method          :   PUT
*/
//using the params
Router.put("/updatebooktitle/:isbn/:title", (req, res) => {
    //update the book database
    database.books.forEach((book) => {
        if (book.ISBN === req.params.isbn) {
            book.title = req.params.title; //body.bookTitle;
        }
    });

    return res.json({
        books: database.books
    });
});
//using the body
//!using the body
Router.put("/updatetitle", (req, res) => {
    //update the book database
    database.books.forEach((book) => {
        if (book.ISBN === req.body.isbn) {
            book.title = req.body.bookTitle;
        }
    });

    return res.json({
        books: database.books
    });
});


/* 
Route           :   /book/update/author
Description     :   to update or add new author in the book
Access          :   Public
Parameter       :   isbn, authorId
Method          :   PUT
*/
Router.put("/updateauthor/:isbn", async(req, res) => {
    //update the bookdatase
    const updatedBook = await BookModel.findOneAndUpdate({
        ISBN: req.params.isbn,
    }, {
        $addToSet: {
            authors: req.body.authorId
        }
    }, { new: true });
    const updatedAuthor = await AuthorModel.findOneAndUpdate({
        id: parseInt(req.body.authorId)
    }, {
        $addToSet: {
            books: req.params.isbn
        }
    }, { new: true });

    return res.json({
        books: updatedBook,
        authors: updatedAuthor,
        message: `book updated successfully for book isbn ${req.params.isbn} in  author with  id${req.body.authorId}`
    });
});


/* 
Route           :   /book/delete
Description     :   to delete a book
Access          :   Public
Parameters      :   isbn
Method          :   DELETE  
*/
Router.delete("/deletebook/:isbn", async(req, res) => {
    const updatedBook = await BookModel.deleteOne({
        ISBN: req.params.isbn
    });
    if (!updatedBook) {
        return res.json({
            message: `no book found for the isbn ${req.params.isbn}`
        });
    } else {
        return res.json({
            books: updatedBook,
            message: `book deleted with isbn ${req.params.isbn}`
        });
    }

    /*
    const updatebookdata = database.books.filter((book) => book.ISBN !== req.params.isbn);
    database.books = updatebookdata;
    return res.json({ books: database.books }); */
});

/*  
Route           :   /book/delete
Description     :   to delete an author from the book
Access          :   Public
Parameters      :   authorid
Method          :   DELETE  
*/
Router.delete("/deleteauthor/:isbn/:authorid", async(req, res) => {

    const updatedBook = await BookModel.findOneAndUpdate({
        ISBN: req.params.isbn
    }, {
        $pull: {
            authors: parseInt(req.params.authorid)
        }
    }, { new: true });

    const updatedAuthor = await AuthorModel.findOneAndUpdate({
        id: parseInt(req.params.authorid)
    }, {
        $pull: {
            books: req.params.isbn
        }
    }, { new: true });

    return res.json({
        books: updatedBook,
        authors: updatedAuthor,
        message: "successfully deleted the author from the book",
    });
});


//export 
module.exports = Router;