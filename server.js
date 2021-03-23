const http = require('http'), 
url = require('url'), 
fs = require('fs');

http.createServer( (request, response) => {
    let addr = request.url, 
    q = url.parse(addr, true),
    filePath = '';

    // To add request to log
    fs.appendFile('log.txt', 'URL: ' + addr + '\nTimestamp: ' + new Date() + '\n\n', (err) => {
        if(err){
            console.log(err)
        }else{
            console.log('Added to log.')
        }
    })

    // To redirect the user depending on the request
    if(q.pathname.includes('documentation')){
        filePath = (__dirname + '/public/documentation.html')
    }else{
        filePath = 'index.html'
    }

    // To send the file requested in the response
    fs.readFile(filePath, (err,data) => {
        if(err){
            throw err
        }
        response.writeHead(200, {'Content-Type': 'text/html'})
        response.write(data);
        response.end();
    });


}).listen(8080)
        
console.log("node server running 8080")