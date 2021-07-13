//prefix    :   /author

const Router = require("express").Router();

//DataBase Model
const AuthorModel = require("../../database/author");


//      ^--     API:  Author    --^

/*
Route           :   /author
Description     :   get all authors
Access          :   public
Parameters      :   None
Methos          :   get
*/
Router.get('/', async(req, res) => {
    const getAllAuthors = await AuthorModel.find();
    if (!getAllAuthors) {
        return res.json({
            message: `author database not found`,
        });
    } else {
        return res.json({ Authors: getAllAuthors });
    }
});

/* 
Route           :   /authorbyid
Description     :   get an author using id
Access          :   public
Parameters      :   id
Methos          :   get
*/
Router.get('/getauthorbyid/:id', async(req, res) => {
    const getSpecificAuthor = await AuthorModel.findOne({ id: req.params.id });
    //const getSpecificAuthor = database.authors.filter((author) => author.id === parseInt(req.params.id));
    return res.json({ authors: getSpecificAuthor });
});

/*
Route           :   /author/getauthorbybookname
Description     :   to get an author based on the book name
Access          :   public
Parameters      :   /bookname
Method          :   GET
*/
Router.get('r/getauthorbybookname/:bookname', async(req, res) => {

    const getSpecificAuthor = await AuthorModel.findOne({ books: req.params.bookname });
    // const getSpecificAuthor = database.authors.filter((author) => author.books.includes(req.params.bookname));
    if (!getSpecificAuthor) {
        console.log("error arised");
        return res.json({ error: `author not found for the specified bookid ${req.params.bookisbn}` });
    } else {
        return res.json({ authors: getSpecificAuthor });
    }
});

/* 
Route           :   /author/newauthor
Description     :   add new authors
Access          :   public
Parameters      :   body
Methos          :   POST
*/
/* 

*/
Router.post('/newauthor', async(req, res) => {
    const { newAuthor } = req.body;
    const addAuthor = await AuthorModel.create(newAuthor);

    //database.books.push(newAuthor);
    return res.json({ Authors: addAuthor, message: "author added *_*" });

});
/* 
Route           :   /author/updatename
Description     :   update authors name using id
Access          :   public
Parameters      :   authorid, authorname
Methos          :   PUT
*/
//!not solved
Router.put('/updateauthorname/:authorid/:authorname', (req, res) => {
    //update the author database
    database.authors.forEach((author) => {
        console.log("author " + author);
        if (author.id === parseInt(req.params.authorid)) {
            console.log("if" + author);
            author.name = req.params.authorname;
            return;
        }
        /*  else {
                    return res.json({
                        message: `no author found for the id ${req.params.authorid}`
                    });
                } */
        return res.json({
            authors: database.authors,
            message: "author name is updated"
        });
    });
    /*
     database.authors.forEach((author) => {
         if (author.id === parseInt(req.params.authorid)) {
             author.name = req.params.authorname;
         }
     }); */
    return res.json({ author: database.authors, message: "author name updatees" });
});


/*
Route           author/updateauthor
Description     update/add new author
Access          PUBLIC
Parameters      isbn
Method          PUT
*/
Router.put("/updateauthor/:isbn", (req, res) => {
    // update the book database
    AuthorModel.findOneAndUpdate({});

    /*  database.books.forEach((book) => {
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
     }); */
});

/*
Route           /author/delete/
Description     delete an author 
Access          PUBLIC
Parameters      authorid
Method          DELETE
*/
Router.delete("/deleteauthor/:authorId/:bookisbn", async(req, res) => {
    //update the bookdatabase
    const updatedBook = await BookModel.findOneAndUpdate({
        ISBN: req.params.authorId
    }, {
        $pull: {
            authors: parseInt(req.params.authorId)
        }
    }, { new: true });

    //update the author database
    const updatedAuthor = await AuthorModel.findOneAndUpdate({
        id: parseInt(req.params.authorId)
    }, {
        $pull: {
            books: req.params.bookisbn
        }
    }, { new: true });
    /* var updatedauthordata = database.authors.filter((author) => author.id !== parseInt(req.params.authorid));

    database.authors = updatedauthordata;
    console.log(updatedauthordata); */
    return res.json({
        books: updatedBook,
        authors: updatedAuthor,
        message: `author with id ${req.params.authorId} deleted successfull 🚀`
    });
});

module.exports = Router;