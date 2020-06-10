var http=require('http');
var fs=require('fs');
//create showtime endpoint for server
var server=http.createServer(function(req,res){
 if(req.url=="/showtimes"){
  res.writeHead(200,{'content-type':'application/json'});//server for json
  var movieIDs=[
   {
      id: 'tt0059742',
      detailsURL: '/movieDetails?id=tt0059742',
      title: 'The Sound of Music',
      times: ['7:15pm', '8:40pm']
   },
   {
     id: 'tt0059113',
     detailsURL: '/movieDetails?id=tt0059113',
     title: 'Doctor Zhivago',
     times: ['7:35pm', '8:10pm', '9:05pm']
   },
   {
     id: 'tt0059243',
     detailsURL: '/movieDetails?id=tt0059243',
     title: 'The Great Race',
     times: ['6:45pm', '9:15pm']
   },
   {
     id: 'tt0059578',
     detailsURL: '/movieDetails?id=tt0059578',
     title: 'For a Few Dollars More',
     times: ['8:05pm', '9:40pm']
   },
   {
     id: 'tt0059661',
     detailsURL: '/movieDetails?id=tt0059661',
     title: 'The Rounders',
     times: ['4:10pm']
   },
   {
     id: 'tt0059800',
     detailsURL: '/movieDetails?id=tt0059800',
     title: 'Thunderball',
     times: ['8:00pm']
   }
 ]
 res.end(JSON.stringify(movieIDs,null, " "));       //convert javascript value(movieIDs values) into a JSON string 
 }

 else{
   res.writeHead(200,{'content-type':'text/html'});
   fs.readFile('Assignment2.html',function(error,data){
     res.end(data);
   })
 }
 //to use styles.css for the main html through webserver
 if (req.url == '/styles.css') {
   res.writeHead(200, {'Content-type' : 'text/css'});
   var file = fs.readFileSync('./styles.css');
   res.write(file);
 }
}).listen(8000);
