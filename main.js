let http = require('http');
let fs = require('fs');

let server = http.createServer(function serve(req, res) {
  
  
  fs.readFile('www' + req.url, function (err,data){
  if (err){
  res.writeHead(200, {'Content-Type': 'text/html'});
  fs.readFile('www/404.html',function(err,data){
res.end(data)
})
  
  }else{
  res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data); //write a response to the client
    res.end();
  }})});
server.listen(8080);
console.log("success");