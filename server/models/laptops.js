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
    att_screen_size: String,
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

module.exports.getByNumber = function(num, callback){
    var q = pcModel.find({}).limit(num);
    q.exec(function(err, docs) {
        callback(docs);
    });
};

module.exports.getAll = function(callback){
     pcModel.find(function (err, docs) {
         callback(docs);
    });
};

module.exports.getBrands = function (callback) {
    pcModel.aggregate([
        {
            $group: {
                _id: '$att_brand',
                total: {$sum: 1}
            }
        }
    ]).exec(function(err, docs){
        callback(docs);
    });
}

module.exports.getAttributeOptions = function (att, callback) {
    pcModel.find().distinct(att, function (err, data) {
            callback(data);
        });
};

module.exports.DoQuery = function (query, callback) {
    console.log('query: ');
    console.log(query);
    //pcModel.find({ 'att_cpu':query.att_cpu}, function(err, docs){
    //    console.log(docs);
    //    callback(docs);
    //});
    var query2 = pcModel.find();
    if (query.att_brand.length > 0){
        query2.where('att_brand').in(query.att_brand)
    }
    if (query.att_cpu !== undefined){
        query2.where('att_cpu', query.att_cpu);
    }
    if (query.att_screen_size !== undefined){
        query2.where('att_screen_size', query.att_screen_size);
    }

    query2.exec(function(err, docs){
            //console.log(docs);
            callback(docs);
        });
        //.where('att_brand').in(query.att_brand)
        //.where('att_cpu').in(query.att_cpu)
        //.where('att_screen_size').in(query.att_screen_size)
        //.exec(function(err, docs){
        //    console.log(docs);
        //        callback(docs);
        //    });
};