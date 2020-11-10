let http = require('http');
let fs = require('fs');
let mime = {
  "aac": "audio/aac",
  "abw": "application/x-abiword",
  "ai": "application/postscript",
  "arc": "application/octet-stream",
  "avi": "video/x-msvideo",
  "azw": "application/vnd.amazon.ebook",
  "bin": "application/octet-stream",
  "bz": "application/x-bzip",
  "bz2": "application/x-bzip2",
  "csh": "application/x-csh",
  "css": "text/css",
  "csv": "text/csv",
  "doc": "application/msword",
  "dll": "application/octet-stream",
  "eot": "application/vnd.ms-fontobject",
  "epub": "application/epub+zip",
  "gif": "image/gif",
  "htm": "text/html",
  "html": "text/html",
  "ico": "image/x-icon",
  "ics": "text/calendar",
  "jar": "application/java-archive",
  "jpeg": "image/jpeg",
  "jpg": "image/jpeg",
  "js": "application/javascript",
  "json": "application/json",
  "mid": "audio/midi",
  "midi": "audio/midi",
  "mp2": "audio/mpeg",
  "mp3": "audio/mpeg",
  "mp4": "video/mp4",
  "mpa": "video/mpeg",
  "mpe": "video/mpeg",
  "mpeg": "video/mpeg",
  "mpkg": "application/vnd.apple.installer+xml",
  "odp": "application/vnd.oasis.opendocument.presentation",
  "ods": "application/vnd.oasis.opendocument.spreadsheet",
  "odt": "application/vnd.oasis.opendocument.text",
  "oga": "audio/ogg",
  "ogv": "video/ogg",
  "ogx": "application/ogg",
  "otf": "font/otf",
  "png": "image/png",
  "pdf": "application/pdf",
  "ppt": "application/vnd.ms-powerpoint",
  "rar": "application/x-rar-compressed",
  "rtf": "application/rtf",
  "sh": "application/x-sh",
  "svg": "image/svg+xml",
  "swf": "application/x-shockwave-flash",
  "tar": "application/x-tar",
  "tif": "image/tiff",
  "tiff": "image/tiff",
  "ts": "application/typescript",
  "ttf": "font/ttf",
  "txt": "text/plain",
  "vsd": "application/vnd.visio",
  "wav": "audio/x-wav",
  "weba": "audio/webm",
  "webm": "video/webm",
  "webp": "image/webp",
  "woff": "font/woff",
  "woff2": "font/woff2",
  "xhtml": "application/xhtml+xml",
  "xls": "application/vnd.ms-excel",
  "xlsx": "application/vnd.ms-excel",
  "xlsx_OLD": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "xml": "application/xml",
  "xul": "application/vnd.mozilla.xul+xml",
  "zip": "application/zip",
  "3gp": "video/3gpp",
  "3gp_DOES_NOT_CONTAIN_VIDEO": "audio/3gpp",
  "3gp2": "video/3gpp2",
  "3gp2_DOES_NOT_CONTAIN_VIDEO": "audio/3gpp2",
  "7z": "application/x-7z-compressed"
}
console.log(mime)


let server = http.createServer(function serve(req, res) {
page = req.url.slice(req.url.lastIndexOf("?"));
console.log(page)
  if (req.url.lastIndexOf('.')==-1){
req.url = req.url.slice(0,req.url.lastIndexOf("/"))
console.log(req.url)
req.url+="index.html"
rawurl=req.url
req.url+=page
console.log(req.url)

}
if (req.url.lastIndexOf("%3C")!=-1 || req.url.lastIndexOf("%3E")!=-1 ){
fs.readFile("www/500bad.html", function(err,data){
res.writeHead(200, {'Content-Type': 'text/html'})
res.end(data)
})
}else{
  
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