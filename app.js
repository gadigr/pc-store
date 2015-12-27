var  express = require('express'),
    app = express(),
    db  = require('./modules/db/db'),
    mDb = require('./modules/db/messages.db'),
    cookieParser = require('cookie-parser'),
    session = require('express-session');


// setup app settings and session
app.use(express.static(__dirname + '../../client'));
app.use(cookieParser());
app.use(session({   secret: '1234567890QWERTY',
    resave: false,
    saveUninitialized: false}));


app.get('/', function (req, res) {
    res.sendFile("index.html", {root: './client'});
});


// run server
var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('app listening at http://%s:%s', host, port);
});
