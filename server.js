var express = require('express');
var moment = require('moment');

var app = express();

app.use(express.static('public'));
app.get('/:timestamp', function(request, response){
	var timestamp = request.params.timestamp;
	var unix = null;
	var normal = null;

	if(+timestamp) {
		unix = +timestamp;
		normal = moment.unix(+timestamp).format("MMMM Do, YYYY");
	}

	if(isNaN(+timestamp) && moment(timestamp, "MMMM Do, YYYY").isValid()){
		unix = moment(timestamp, "MMMM Do, YYYY").format("X");
		normal = moment(timestamp).format("MMMM Do, YYYY");
	}
	var obj = {
		"unix": unix,
		"Normal Time": normal
	}
	response.send(JSON.stringify(obj, null, 4));
});
app.listen(8080, function(err){
	if(err) throw err;
	console.log("Listening on port 8080...");
});