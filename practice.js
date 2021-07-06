const express = require("express");
const app = express();

//getting the available port
/* var portNUmber = process.env.port;
app.set("port", portNUmber || 3000); */



app.get('/', function(req, res) {
    res.type('text/plain');
    res.send('hello World');
});
app.get('/name', function(req, res) {
    res.type('type/text');
    res.end('Sudheer Kumar');
});

//custome 404 page
app.use((req, res) => {
    res.type('text/plain');
    res.status(404);
    res.send("404 - NOT FOUND");
});

app.listen(3000, function() {
    console.log("express started at port" + 3000);

});