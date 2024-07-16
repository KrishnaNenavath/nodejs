const http = require('http');
const fs = require('fs')
const url = require('url')

const myserver =  http.createServer((req, res)=>{
    if(req.url === '/favicon.ico') return res.end()
    const log = `${Date.now()}: New req Recived at ${req.url}\n`
const myurl = url.parse(req.url, true)
console.log(myurl)
    fs.appendFile('log.txt', log, (err, data)=>{
        console.log("New Req Rec.")
        switch(myurl.pathname){
            case '/' : res.end("Hello There! welcome to node js ")
            break
            case '/about':
                const username = myurl.query.myname
                 res.end(`Hi ${username}`)
            break
            default: res.end("404 Not Found!")

        }
    })
    
});
myserver.listen(8080, ()=> console.log("server started!"))