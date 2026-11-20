import { createServer, IncomingMessage, Server, ServerResponse } from "http";

// * createServer's callback runs once per incoming request
// ? req = what the client sent, res = what we send back
const server : Server =createServer((req : IncomingMessage,res: ServerResponse)=>{
    // console.log("Request",req);
    // console.log("Response",res);
    // console.log(req.url);
    // console.log(req.method);

    const url= req.url; // gives endpoints : "/","/products","/course"
    const method = req.method;// "GET","PUT","POST"

    // * manual routing = compare url + method yourself (Express automates this)
    if( url ==="/" && method === "GET"){
        // console.log("this is root route!!!")
        // res.writeHead(200,{'Content-Type': 'text/plain',})
        // res.end("this is root Route!")

        // ! forget res.end() and the client hangs forever
        // ? writeHead = status + headers, end = send body and finish
        res.writeHead(200,{'Content-Type': 'application/json',})
        // ? end() needs a string, so objects go through JSON.stringify
        res.end(JSON.stringify({message: "this is root Route!"}))
    }else if(url?.startsWith("/products")){ // ! matches ANY method and "/productsXYZ"; `?.` because req.url can be undefined
        res.writeHead(200,{"content-type": "application/json"}) // ? header names are case-insensitive
        res.end(JSON.stringify({message: "This is products Route"}))
    }else{
        // console.log("this route is not defined!!!!")

        // * always keep a fallback so unknown routes get a 404
        res.writeHead(404,{'Content-Type': 'application/json',})
        res.end(JSON.stringify({message:"this route is not defined!!!!"}))
    }

})

// ? listen() opens the port; callback fires once the server is ready
server.listen(5000,()=>{
    console.log("Server is running Successfully!")
})
// TODO: "/?x=1" returns 404 because of url === "/". Parse with new URL() to ignore the query string
