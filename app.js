var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cookieSession = require('cookie-session');
var  mongodb = require('mongodb');
var  server  = new mongodb.Server('localhost', 27017, {auto_reconnect:true});
var  db = new mongodb.Db('order', server);
//var  db = new mongodb.Db('order', server, {safe:true});
app.use(express.static('./'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieSession({
	name: 'order-session',
	secret:'cyl'
}));
app.get('/user', function (req, res) {
	req.session.username="陈阳林";
	req.session.password="123456";
	res.send('Hello World!');
});
app.post('/login', function (req, res) {
	console.log(req.body);
	if((req.body.username=="admin")&&(req.body.password=="cl")){
	req.session.username="陈阳林";
	req.session.password="123456";
//	res.send("验证成功");
	res.sendfile("./admin.html");
//		res.redirect("/admin.html");
	}else{
	res.send("验证失败");
//	res.sendfile("./login.html");
//		res.redirect("/login.html");


	}

});
app.get('/session', function (req, res) {
	var name=req.session.username;
	req.session=null;
	res.send(name);
});
app.get('/admin', function (req, res) {
	if(req.session.username=="陈阳林"){
		res.redirect("./admin.html");
	}
	else{
		res.redirect("./login.html");

	}
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
					collection.update({depart:req.body.depart,people:req.body.people,year:req.body.year,month:req.body.month},req.body,function(err,result){

						if(result.result.nModified){
							return res.send("预定成功,可到查询页查看结果");
							res.end();


						}
						else{

							collection.save(req.body);
							return res.send("预定成功,可到查询页查看结果");
							res.end();
						}



					});

					//	collection.find({depart:req.body.depart,people:req.body.people}).toArray(function(err,docs){
					//		console.log('find');
					//	}); 
				}
			});

			}
		});
		//res.end("ok");
	});
	function getMyDate(f){
		db.open(function(err,db){
			if(!err){
				db.collection('date',{safe:true}, function(err, collection){
					if(!err){
						collection.find().toArray(function(err,docs){
							console.log(docs);
							console.log("ok");
							f(docs);	
						});
					}
				});
			}
		});

		//return null;


	}
	app.get('/date', function (req, res) {

		console.log(req.body);
		db.open(function(err,db){
			if(!err){
				console.log('connect db date');
				db.collection('date',{safe:true}, function(err, collection){
					if(!err){
						collection.find().toArray(function(err,docs){
							//console.log(docs);
							return res.send(docs);
							res.end();
						});
					}
				});
			}
		});
	});
	app.post('/date', function (req, res) {

		console.log(req.body);
		db.open(function(err,db){
			if(!err){
				console.log('connect db date');
				db.collection('date',{safe:true}, function(err, collection){
					if(!err){
						collection.update({},req.body)
						return res.send("设定成功");
						res.end();
					}
				});
			}
		});
	});
	app.post('/addPeople', function (req, res) {

		console.log(req.body);
		db.open(function(err,db){
			if(!err){
				console.log('connect db date');
				db.createCollection('people',{safe:true}, function(err, collection){
					if(!err){
						collection.update({depart:req.body.depart,people:req.body.people,year:req.body.year,month:req.body.month},req.body,function(err,result){

							if(result.result.nModified){

								return res.send("添加成功");
								res.end();

							}
							else{

								collection.save(req.body);
								return res.send("添加成功");
								res.end();
							}



						});
					}
				});
			}
		});
	});
	app.post('/delPeople', function (req, res) {

		console.log(req.body);
		db.open(function(err,db){
			if(!err){
				console.log('connect db date');
				db.collection('people',{safe:true}, function(err, collection){
					if(!err){
						collection.remove(req.body);
						return res.send("删除成功");
						res.end();
					}
				});
			}
		});
	});

	app.post('/select', function (req, res) {
		getMyDate(function(val){
			console.log(val[0]);
			//console.log(val[0].year);
			console.log(req.body);
			db.open(function(err,db){
				if(!err){
					console.log('connect db order');
					db.collection('people',{safe:true}, function(err, collection){
						//db.collection('order',{safe:true}, function(err, collection){
						if(!err){
							collection.find({depart:req.body.depart}).toArray(function(err,docs){
								console.log(docs);
								return res.send(docs);
								res.end();
							});
						}
						});
					}
				});

			});
		});
		app.post('/searchPeople', function (req, res) {
			console.log(req.body);
			db.open(function(err,db){
				if(!err){
					console.log('connect db people');
					db.collection('people',{safe:true}, function(err, collection){
						if(!err){
							collection.find().toArray(function(err,docs){
								console.log(docs);
								return res.send(docs);
								res.end();
							});
						}
					});
				}
			});

		});
		app.post('/search', function (req, res) {
			getMyDate(function(val){
				console.log(val[0]);

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
								collection.find({depart:req.body.depart,people:req.body.people,year:val[0].year,month:val[0].month}).toArray(function(err,docs){
									console.log('find');
									return res.send(docs[0]);
									res.end();
								});
							}
						});

					}
				});
			});
		});
		app.post('/tj', function (req, res) {

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
							collection.find({year:req.body.year,month:req.body.month}).toArray(function(err,docs){
								console.log('find');
								return res.send(docs);
								res.end();
							});
						}
					});

				}
			});
		});
		var server = app.listen(3000, function () {
			var host = server.address().address;
			var port = server.address().port;

			console.log('Example app listening at http://%s:%s', host, port);
		});

