var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var  mongodb = require('mongodb');
var  server  = new mongodb.Server('localhost', 27017, {auto_reconnect:true});
var  db = new mongodb.Db('order', server);
//var  db = new mongodb.Db('order', server, {safe:true});
app.use(express.static('./'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.get('/user', function (req, res) {
	res.send('Hello World!');
});
app.post('/order', function (req, res) {
	console.log(req.body);
	db.open(function(err,db){
		if(!err){
			console.log('connect db order');
			//db.collection('order',{safe:true}, function(err, collection){
			db.createCollection('order',{safe:true}, function(err, collection){
				if(!err){
				/**
					collection.insert(req.body,function(err, result){
						console.log(result);
					});
					*****/
				//	collection.save(req.body);
					//collection.update({depart:req.body.depart,people:req.body.people},{$set:{lunch:req.body.lunch}},true);
					collection.update({depart:req.body.depart,people:req.body.people},req.body,true);
					res.send("ok");
					res.end();

				//	collection.find({depart:req.body.depart,people:req.body.people}).toArray(function(err,docs){
				//		console.log('find');
				//	}); 
				}
			});

		}
	});
	//res.end("ok");
});

app.post('/search', function (req, res) {
	
	console.log(req.body);
	db.open(function(err,db){
		if(!err){
			console.log('connect db order');
			db.collection('order',{safe:true}, function(err, collection){
				if(!err){
					/**
					collection.find({depart:req.body.depart,people:req.body.people},function(err,data){
						console.log(data.depart);	
					
					});
				**/
					//console.log(result);
						collection.find({depart:req.body.depart,people:req.body.people}).toArray(function(err,docs){
						console.log('find');
						//var rjson=JSON.parse(docs);
						//console.log(rjson.depart);
						console.log(docs);
						console.log(docs[0].lunch);
						return res.send(docs[0]);
						res.end();
						});
				}
			});

		}
			});
	//res.end();
});
var server = app.listen(3000, function () {
	var host = server.address().address;
	var port = server.address().port;

	console.log('Example app listening at http://%s:%s', host, port);
});

