var mongodb = require('mongodb'),
    MongoClient = mongodb.MongoClient,
    mongoose = require('mongoose');
    //localdb  = require('./db-init');

var seedData = require('../db/db-init');
var db = mongoose.connection;
var collection;

var pcSchema = mongoose.Schema({
    att_brand: String,
    att_cpu:  String,
    att_gpu:  String,
    att_os: {
        brand: String,
        version: String
    },
    att_pixels_x: Number,
    att_pixels_y: Number,
    att_ram: Number,
    att_screen_size: Number,
    att_ssd: Number,
    att_storage: Number,
    att_touchscreen: Boolean,
    att_weight: Number,
    image: String,
    name: String,
    price: Number
});

var pcModel = mongoose.model('pc', pcSchema);

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    // we're connected!
    console.log("Connected to Database");

    pcModel.count(function (err, count){
        if(err) {
            console.log("Failed to retrieve database count");
        }else{
            pcModel.remove({}, function(err) {
                if(err){
                    console.log('Error delete previous data')
                }else{
                    console.log('Delete previous data');
                }

                console.log("Seeding Data");
                seedData.initialPc.forEach(function(item){
                    var currPc = new pcModel(item);
                    currPc.save(function(err, rowAffected){
                        if(!err && rowAffected){

                        }else{
                            console.log("Error seeding Data");
                        }
                    });
                });
            });
        }
    });
});

 collection = db.collection('laptops');

module.exports.getAll = function(callback){
     pcModel.find(function (err, docs) {
         callback(docs);
    });
};

module.exports.getAttributeOptions = function (att, callback) {
    var test = collection.distinct(att).then(function (data) {
        callback(data);
    });
}
