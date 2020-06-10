var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect('localhost:27017/mydb');

var Schema = mongoose.Schema;

var usernamesSchema = new Schema({
	Username: {type: String,
         		unique: true},
	Password: String
}, {collection: 'usernames'});
var user = mongoose.model('usernames', usernamesSchema);



app.set('port', process.env.PORT || 2500);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));

app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

var usernames = ['admin', 'bsmith', 'rfortier'];

function userExists(toFind){
	var exists = false;

	for(var i = 0; i < usernames.length; i++){
		if(usernames[i] === toFind){
			return true;
		}
	}
	return false;
}

app.get('/checkUsername', function(request, response) {
  response.render('enterUsername', {message: 'Enter username:',result: "init"});
});

app.post('/checkUsername', function(request, response){
	var username = request.body['username'];
	if (userExists(username)) {
	  response.render('enterUsername', {message: 'The username already exists. Please try another.',result: "rejected"})      //rejected results in the red color
	} else {
	  response.render('enterUsername', {message: 'That username is available.',result: "accepted"})                            //accepted results in the green color
	}
  });

app.listen(app.get('port'), function() {
	console.log('Server listening on port ' + app.get('port'));
});
