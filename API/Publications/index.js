//prefix    :   //publication

//Initializing the Router
const Router = require("express").Router();

//DataBase Model
const PublicationModel = require("../../database/publication");



//API:  Publication

/* 
Route           :   /pub
Description     :   get all publicationd
Access          :   public
Parameters      :   None
Methos          :   get
*/
Router.get('/', async(req, res) => {
    const getAllPublications = await PublicationModel.find();
    if (!getAllPublications) {
        return res.json({
            error: `sorry no authors found`
        });
    } else {
        return res.json({ publications: getAllPublications });
    }
});


/* 
Route           :   /pub
Description     :   get a publication based on id
Access          :     public
Parameters      :   id
Methos          :   get
*/

/* 
Router.get('/pub/publicationid/:id', async(req, res) => {
    const getSpecificPublication = await PublicationModel.findOne({ id: parseInt(req.params.id) });
    if (!getSpecificPublication) {
        return res.json({
            message: `publication not found for the specified publication id ${req.params.id}`
        });
    } else {
        return res.json({ publications: getSpecificPublication });
    }
    //const getSpecificPublication = database.publications.filter((publication) => publication.id === parseInt(req.params.id));
});

 */
Router.get("/publicationid/:id", async(req, res) => {
    const getSpecificPublication = await PublicationModel.findOne({
        id: parseInt(req.params.id)
    });
    if (!getSpecificPublication) {
        return res.json({
            error: `no publication is found for the specified id ${req.params.id}`
        });
    } else {
        return res.json({
            Publications: getSpecificPublication,
        });
    }
});
/*
Route           :   /author
Description     :   to get an author based on the book name
Access          :   public
Parameters      :   /bookisbn
Method          :   GET
*/
Router.get('/pubicationname/:bookname', async(req, res) => {
    const getSpecificPublication = await PublicationModel.findOne({ books: req.params.bookname });

    // const getSpecificPublication = database.publications.filter((publication) => publication.books.includes(req.params.bookname));
    if (!getSpecificPublication) {

        return res.json({ error: getSpecificPublication });
    } else {

        return res.json({ publication: getSpecificPublication });
    }
});

/* 
Route           :   /pub/newpub
Description     :   add new publication
Access          :   public
Parameters      :   body
Methos          :   POST
*/
Router.post('/newpublication', async(req, res) => {
    const { newPublication } = req.body;
    const addPublication = await PublicationModel.create(newPublication);
    //database.books.push(newPublication);
    return res.json({
        publications: addPublication,
        message: "publictions added *__*"
    });
});

/* 
Route           :   /publication/update/book
Description     :   update/add a book to a  publication
Access          :   public
Parameters      :   isbn
Methos          :   PUT
*/

Router.put('/updatepublication/book/:isbn', async(req, res) => {
    //update the book database
    const updatedBook = await BookModel.findOneAndUpdate({
        ISBN: req.params.isbn
    }, {
        $pull: {
            publication: parseInt(req.body.pubId)
        }
    }, { new: true });

    const updatedPublication = await PublicationModel.findOneAndUpdate({
        id: parseInt(req.body.pubId)
    }, {
        $pull: {
            publication: req.params.isbn
        }
    }, { new: true });

    return res.json({
        books: updatedBook,
        publications: updatedPublication,
        message: "publication updated successfully"
    });
});
/*
Route           /publication/delete/
Description     delete a publication 
Access          PUBLIC
Parameters      authorid
Method          DELETE
*/
Router.delete("/deletepublication/:publicationId", async(req, res) => {
    const updatedPublication = await PublicationModel.deleteOne({ id: parseInt(req.params.publicationId) });
    if (!updatedPublication) {
        return res.json({
            message: `publication not found for the specifified id ${req.params.publicationId}`
        });
    } else {
        return res.json({
            message: `publication deleted successfully for the id ${req.params.publicationId}`
        });
    }
});

/* 
Route           /publication/deletepublication/
Description     delete a publication 
Access          PUBLIC
Parameters      publicationid
Method          DELETE
*/
Router.delete("/deletepublication/byid/:publicationId/:isbn", async(req, res) => {
    //update book database
    const updatedBook = await BookModel.findOneAndDelete({
        authors: parseInt(req.params.publicationId)
    }, function(error, docs) {
        if (error) {
            return res.json({
                error: `error raised ${error}`
            });
        } else {
            return res.json({
                message: `Publication deleted successfully for the id ${req.params.publicationId}`
            });
        }
    });
    const updatedPublication = await PublicationModel.findOneAndDelete({
        id: parseInt(req.params.publicationId)
    }, function(error, docs) {
        if (error) {
            return res.json({
                error: `error raised ${error}`
            });
        } else {
            return res.json({
                message: `Publication deleted successfully for the id ${req.params.publicationId}`
            });
        }
    });
    return res.json({
        books: updatedBook,
        publications: updatedPublication,
        message: "publication delted succcessfully from the book"
    });

});

module.exports = Router;