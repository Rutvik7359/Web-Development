var express = require('express');
var app = express();

app.use(express.static('public'));

app.set('views', __dirname + '/views');
app.set('view engine', 'pug');       

app.get('/checkUsername', function(request, response) {
  response.render(); 
});



app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), function () {
  console.log('Listening on port ' + app.get('port'));
});