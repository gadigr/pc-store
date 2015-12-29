var mongodb = require('mongodb'),
    MongoClient = mongodb.MongoClient,
    url = 'mongodb://localhost:27017/laptops_db',
    localdb  = require('./db-init');

MongoClient.connect(url, function(err, db) {
    if (err) {
        console.log('Unable to connect to the mongoDB server. Error:', err);
    }

    var collection = db.collection('laptops');

    console.log("Connected to Database");
    collection.remove(function(err, result) {
        collection.insert(localdb, function (docs) {
            collection.count(function (err, count) {
                console.log("There are " + count + " laptops in the db...");
            });
        });
    });

    module.exports.getAll = function(callback){
        collection.find({}).toArray(function (err, docs) {
            callback(docs);
        });
    };

    module.exports.getAttributeOptions = function (att, callback){
        var test = collection.distinct(att).then(function (data) {
            callback(data);
        });



    }

    //module.exports.getRelevantMessage = function(screen,next){
    //
    //    var date = new Date();
    //    var timeString = date.getHours()+":"+date.getMinutes();
    //    collection.find({screens:screen,
    //            "timeTable.dateRange.from": {"$lte":date},
    //            "timeTable.dateRange.to": {"$gte":date},
    //            "timeTable.weekDays": date.getDay() + 1,
    //            "timeTable.timeRange":{$elemMatch:
    //            {
    //                $or: [ { day:  date.getDay() + 1  }, { day: "*" } ],
    //                from:{"$lte":timeString},
    //                to:{"$gte":timeString}
    //            }}})
    //        .toArray(function (err, docs) {
    //            next(docs);
    //        })
    //};
});

/**
 * Created by gadi on 12/27/2015.
 */
