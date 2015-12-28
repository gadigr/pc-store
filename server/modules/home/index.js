/**
 * Created by gadi on 12/28/2015.
 */

var laptopsDb = require('../laptops/db.laptops');

exports.render = function(req, res) {
    var path = require('path');
    console.log('got to home');
    res.sendFile(path.join(__dirname, '../../../client', 'main.html'));
}


exports.getAllLaptops = function(req, res) {
    console.log('getLaptops');
    laptopsDb.getAll(function(docs){
       res.send(docs);
    });
};