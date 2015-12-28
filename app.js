var  express = require('express'),
    app = express(),
    cookieParser = require('cookie-parser'),
    session = require('express-session');

// Modules
var laptopsDb = require('./server/modules/laptops/db.laptops');
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
