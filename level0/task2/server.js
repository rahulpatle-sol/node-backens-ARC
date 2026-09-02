//  this code containms the file vased server data rendering 
//
//useinn  streaming

import fs from "node:fs";
import http from "node:http";



const  port=4000;
const  server=http.createServer((req,res)=>{
    if(req.url=="/"){
        res.writeHead(200,{'Content-Type':'text/html'});
        const readStream=fs.createReadStream("./index.html");
        readStream.pipe(res);
    }
    else if(req.url=="/about"){
        res.writeHead(200,{'Content-Type':'text/html'});
        const readStream=fs.createReadStream("./about.html");
        readStream.pipe(res);
    }
    else{
        res.writeHead(404,{'Content-Type':'text/html'});
        const readStream=fs.createReadStream("./404.html");
        readStream.pipe(res);
    }
})

server.listen(port,()=>{
    console.log(`server is running on port ${port}`);
});
