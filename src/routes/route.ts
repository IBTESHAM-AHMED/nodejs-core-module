// * Router: looks at url + method and decides who handles the request

import type { IncomingMessage, ServerResponse } from "node:http";
import productController from "../controllers/product.controller";

const routeHandler = (req: IncomingMessage, res: ServerResponse)=>{
    const url= req.url; // "/", "/products", ...
    const method = req.method; // "GET", "PUT", "POST", ...

    if( url ==="/" && method === "GET"){
        // * writeHead = status + headers, end = send body and finish
        // ! forget res.end() and the client hangs
        res.writeHead(200,{'Content-Type': 'application/json',})

        // * end() takes a string, so use JSON.stringify for objects
        res.end(JSON.stringify({message: "this is root Route!"}))

    }else if(url?.startsWith("/products")){
        // ! matches ANY method and "/productsXYZ"; `?.` because url can be undefined

        productController(req,res);  //  delegate to the controller (it must call res.end())
    }else{
        // * fallback: unknown routes get a 404
        res.writeHead(404,{'Content-Type': 'application/json',})
        res.end(JSON.stringify({message:"this route is not defined!!!!"}))
    }
}

export default routeHandler;

