var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(express.static('./'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.get('/user', function (req, res) {
	  res.send('Hello World!');
});
app.post('/order', function (req, res) {
	console.log(req.body);
	res.end();
});

var server = app.listen(3000, function () {
	  var host = server.address().address;
	    var port = server.address().port;

	      console.log('Example app listening at http://%s:%s', host, port);
});

