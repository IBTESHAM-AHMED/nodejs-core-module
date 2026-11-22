// * Controller: builds the response for one resource (products)
import { IncomingMessage, ServerResponse } from 'http';

// TODO: branch on req.method here (GET list, POST create, PUT update, DELETE remove)
const productController = (req: IncomingMessage, res: ServerResponse)=>{

        res.writeHead(200,{"content-type": "application/json"})     // ? header names are case-insensitive
        res.end(JSON.stringify({message: "This is products Route"}))

}

export default productController;
