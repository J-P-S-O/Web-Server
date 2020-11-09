let http = require('http');
let fs = require('fs');

let server = http.createServer(function serve(req, res) {
  if (req.url.lastIndexOf('.')==-1){
    req.url+="index.html"
  }
  if(req.url.lastIndexOf('>')!=-1 || req.url.lastIndexOf('<')!=-1){
  res.writeHead(200, {'Content-Type': 'text/html'})
  res.end('www/'+'500bad.html')
  
  }else{
  fs.readFile('www' + req.url, function (err,data){
  if (err){
  res.writeHead(200, {'Content-Type': 'text/html'});
  fs.readFile('www/404.html',function(){})
  res.end('www/'+'404.html')
  
  }else{
  res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data); //write a response to the client
    res.end();
  }})}}
  );
server.listen(8080);
console.log("succes");