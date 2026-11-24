// * Controller: builds the response for one resource (products)
import { IncomingMessage, ServerResponse } from 'http';
import { productService } from '../service/product.service';
import console from 'console';
import type { IProduct } from '../types/product';
import { bodyParse } from '../utils/parseBody';

// TODO: branch on req.method here (GET list, POST create, PUT update, DELETE remove)
const productController = async(req: IncomingMessage, res: ServerResponse) => {

        const url = req.url;
        const method = req.method;
        // console.log(url);// ->/prodcts/1
        // Get ALL Product        
        const urlParams = url?.split("/");
        // console.log(urlParams);// [ '', 'products', '1' ]
        const id = urlParams && urlParams[1] ===
                "products" ? Number(urlParams[2]) : null;

        console.log(id);
        if (url === "/products" && method === "GET") {
                // const products = [{}];
                const products = productService();// [{},{},{}]

                res.writeHead(200,
                        { "content-type": "application/json" } // ? header names are case-insensitive
                );
                res.end(
                        JSON.stringify({
                                message: "Products retrieved successfully",
                                data: products,
                        }),
                );
        } else if (method === "GET" && id !== null) {
                const products = productService();// [{},{},{}]
                const product = products.find((p: IProduct) => p.id === id);
                res.writeHead(200,
                        { "content-type": "application/json" } // ? header names are case-insensitive
                );
                res.end(
                        JSON.stringify({
                                message: "Products retrieved successfully",
                                data: product,
                        }),
                );
        } else if (method === "POST" && url === "/products") {
                //*
                const body = await bodyParse(req);
                console.log(body);
              
                res.writeHead(201,
                        { "content-type": "application/json" } // ? header names are case-insensitive
                );
                res.end(
                        JSON.stringify({
                                message: "Products created successfully",
                                
                        }),
                );
        };
}

export default productController;
