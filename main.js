let http = require('http');
let fs = require('fs');
let url = require('url')
let path = require('path')
let mime =
{
  aac: 'audio/aac',
  abw: 'application/x-abiword',
  ai: 'application/postscript',
  arc: 'application/octet-stream',
  avi: 'video/x-msvideo',
  azw: 'application/vnd.amazon.ebook',
  bin: 'application/octet-stream',
  bz: 'application/x-bzip',
  bz2: 'application/x-bzip2',
  csh: 'application/x-csh',
  css: 'text/css',
  csv: 'text/csv',
  doc: 'application/msword',
  dll: 'application/octet-stream',
  eot: 'application/vnd.ms-fontobject',
  epub: 'application/epub+zip',
  gif: 'image/gif',
  htm: 'text/html',
  html: 'text/html',
  ico: 'image/x-icon',
  ics: 'text/calendar',
  jar: 'application/java-archive',
  jpeg: 'image/jpeg',
  jpg: 'image/jpeg',
  js: 'application/javascript',
  json: 'application/json',
  mid: 'audio/midi',
  midi: 'audio/midi',
  mp2: 'audio/mpeg',
  mp3: 'audio/mpeg',
  mp4: 'video/mp4',
  mpa: 'video/mpeg',
  mpe: 'video/mpeg',
  mpeg: 'video/mpeg',
  mpkg: 'application/vnd.apple.installer+xml',
  odp: 'application/vnd.oasis.opendocument.presentation',
  ods: 'application/vnd.oasis.opendocument.spreadsheet',
  odt: 'application/vnd.oasis.opendocument.text',
  oga: 'audio/ogg',
  ogv: 'video/ogg',
  ogx: 'application/ogg',
  otf: 'font/otf',
  png: 'image/png',
  pdf: 'application/pdf',
  ppt: 'application/vnd.ms-powerpoint',
  rar: 'application/x-rar-compressed',
  rtf: 'application/rtf',
  sh: 'application/x-sh',
  svg: 'image/svg+xml',
  swf: 'application/x-shockwave-flash',
  tar: 'application/x-tar',
  tif: 'image/tiff',
  tiff: 'image/tiff',
  ts: 'application/typescript',
  ttf: 'font/ttf',
  txt: 'text/plain',
  vsd: 'application/vnd.visio',
  wav: 'audio/x-wav',
  weba: 'audio/webm',
  webm: 'video/webm',
  webp: 'image/webp',
  woff: 'font/woff',
  woff2: 'font/woff2',
  xhtml: 'application/xhtml+xml',
  xls: 'application/vnd.ms-excel',
  xlsx: 'application/vnd.ms-excel',
  xlsx_OLD: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  xml: 'application/xml',
  xul: 'application/vnd.mozilla.xul+xml',
  zip: 'application/zip',
  '3gp': 'video/3gpp',
  '3gp_DOES_NOT_CONTAIN_VIDEO': 'audio/3gpp',
  '3gp2': 'video/3gpp2',
  '3gp2_DOES_NOT_CONTAIN_VIDEO': 'audio/3gpp2',
  '7z': 'application/x-7z-compressed'
}
console.log(mime)

let cwd = process.cwd()
console.log(cwd)
let server = http.createServer(function serve(req, res) {


let rawurl= url.parse(req.url).pathname
rawurl = rawurl.substring(1) //cut slash
console.log(rawurl)
// until here we've normalized the url
try{
if (fs.lstatSync(path.join(cwd,rawurl)).isDirectory()){ //check if path is dir, throw err if non existent
	if (fs.existsSync(path.join(cwd,rawurl,'index.html'))){
	fs.readFile(path.join(cwd,rawurl,'index.html'), function (err,data){
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(data)
	res.end()
  
  return 0
})
}else{
  //no indexfile, list dir
  fs.readdir(path.join(cwd,rawurl), (err, files) => {
    if (err) {
        res.writeHead(200, {'Content-Type': 'text/plain'})
        res.end(JSON.stringify(err))
        console.log("unknown readdir error -->"+ err.message)
        return 1
    }

    // files object contains all files names
    // log them on console
    res.writeHead(200, {'Content-Type': 'text/html'})
    res.write(`<html><head></head>`)
    files.forEach(file => {
        res.write(`<a href = ${path.join(rawurl,file)}>${file}</a><p></p>`)

    });
      res.end(`</html>`)
      return 0
});
}

}else{ //not a dir
  try{
 res.writeHead(200, {'Content-Type': mime[req.url.slice(req.url.lastIndexOf('.')+1)]||'text/html'});
 let stream = fs.createReadStream(path.join(cwd,rawurl))
 stream.on('open', function(){
   stream.pipe(res);

 })

 return 0
}catch(e){

  console.log(e.message)
  return 3
}
}
}catch(e){//non existent dir nor file
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.write(e.message)
  console.log("err: --->" + e.message)
	res.end()
  return 2
}
console.log("unhandled request: " + rawurl)
)});

server.listen(80);
console.log("success");
