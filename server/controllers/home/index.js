/**
 * Created by gadi on 12/28/2015.
 */

var laptopsDb = require('../../models/laptops');


exports.render = function(req, res) {
    var path = require('path');
    res.sendFile(path.join(__dirname, '../../../client', 'main.html'));
}


exports.getAllLaptops = function(req, res) {
    laptopsDb.getAll(function(docs){
       res.send(docs);
    });
};

exports.getSearchValues = function(req, res) {
  console.log('get ' + req.params.att);

    laptopsDb.getAttributeOptions(req.params.att, function (opts) {
       res.send(opts);
    });
};