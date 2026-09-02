

import http from 'http';
import url from 'url';


//  task 
// GET /         → "Hello World"
// GET /about    → "About Page"
// GET /*        → 404 "Not Found"
const port=3000;


const server=http.createServer((req,res)=>{
 if(req.method==='GET'){
        if(req.url==='/'){
            res.writeHead(200,{'Content-Type':'text/html'});
            res.end('<h1>Hello World</h1>');
        }else if(req.url==='/about'){
            res.writeHead(200,{'Content-Type':'text/html'});
            res.end('<h1>About Page</h1>');
        }else{
            res.writeHead(404,{'Content-Type':'text/html'});
            res.end('<h1>404 Not Found</h1>');
        }}
})

   




server.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`);
}   );
// server listenind