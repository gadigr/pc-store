var express = require('express'),
    mongoose = require('mongoose'),
    url = 'mongodb://localhost:27017/laptops_db',
    app = express(),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    io = require('socket.io');



mongoose.connect(url);


// Modules
var homeRouts = require('./server/routes/home')(app);
var findRouts = require('./server/routes/find')(app);
var chatRouts = require('./server/routes/chat')(app);
var adminRouts = require('./server/routes/admin')(app);

// setup app settings and session
app.use(express.static(__dirname + '/client'));
app.use(cookieParser());
app.use(session({   secret: '1234567890QWERTY',
    resave: false,
    saveUninitialized: false}));


// run server
var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('app listening at http://%s:%s', host, port);
});

io = io.listen(server);
require('./server/controllers/chat/')(io);
