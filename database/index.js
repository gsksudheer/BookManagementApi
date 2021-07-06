let books = [{
        ISBN: "123@book1",
        title: "learn to be smart",
        language: "en",
        pubDate: "2020-01-06",
        numOfPages: "999",
        authors: [1, 2],
        category: ["education", "knowledge"],
        publication: [1, 2]
    },
    {
        ISBN: "123@book2",
        title: "act as a cmart",
        language: "telugu",
        pubDate: "2021-01-06",
        numOfPages: "1999",
        authors: [1],
        category: ["tech", "programming"],
        publication: [2, 2, 2],
    }
];

let authors = [{
        id: 1,
        name: "sudheer",
        books: ["123@book1", "askme"],
    },
    {
        id: 2,
        name: "king",
        books: ["askme", "given"],
    }
];

let publications = [{
        id: 1,
        name: "gsk",
        books: ["123@book1"],
    },
    {
        id: 2,
        name: "gsksudheer",
        books: ["123@book1", "pub"],
    }
];

module.exports = { books, authors, publications };