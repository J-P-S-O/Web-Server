let http = require('http');
let fs = require('fs');
let mime = require('./conf/mime.json')
console.log(mime)


let server = http.createServer(function serve(req, res) {
let page = req.url.slice(req.url.lastIndexOf("?"));

req.url = req.url.replace(page,"")

console.log("request cut: "+page+ " url is now "+req.url)
  if (req.url.lastIndexOf('.')==-1){
req.url+="index.html"
console.log("url that we will try to find:")



console.log(req.url)

}

let rawurl=req.url
if (req.url.lastIndexOf("%3C")!=-1 || req.url.lastIndexOf("%3E")!=-1 ){
fs.readFile("www/500bad.html", function(err,data){
res.writeHead(200, {'Content-Type': 'text/html'})
res.end(data)
})
}else{
  let a = rawurl
  console.log(rawurl)
  fs.readFile('www/' + rawurl, function (err,data){
  if (err){
  res.writeHead(200, {'Content-Type': 'text/html'});
  fs.readFile('www/404.html',function(err,data){
res.end(data)
})
  
  }else{
	 
  res.writeHead(200, {'Content-Type': mime[req.url.slice(req.url.lastIndexOf('.')+1)]||'text/html'});
    res.write(data); //write a response to the client
    res.end();
}})}});

server.listen(80);
console.log("success");