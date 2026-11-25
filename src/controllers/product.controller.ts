// * Controller: handles all /products requests and sends the response
import { IncomingMessage, ServerResponse } from 'http';
import { createProduct, productService } from '../service/product.service';
import console from 'console';
import type { IProduct } from '../types/product';
import { bodyParse } from '../utils/parseBody';
import path from 'node:path';

// ? async because POST awaits the body
const productController = async (req: IncomingMessage, res: ServerResponse) => {

        const url = req.url;
        const method = req.method;
        // console.log(url);// ->/prodcts/1
        // Get ALL Product        
        // * get the id from the URL: "/products/1".split("/") -> ["", "products", "1"]
        const urlParams = url?.split("/");
        // console.log(urlParams);// [ '', 'products', '1' ]
        const id = urlParams && urlParams[1] ===
                "products" ? Number(urlParams[2]) : null;

        // ? id is a number for "/products/1", or null when the URL isn't under /products
        console.log(id);
        // * route 1: GET /products -> list all
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
                // * route 2: GET /products/:id -> one product
        } else if (method === "GET" && id !== null) {
                const products = productService();// [{},{},{}]
                // ? find() picks the product whose id matches the URL id
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
                // * route 3: POST /products -> create (reads the JSON body)
        } else if (method === "POST" && url === "/products") {
                //*
                // ? wait for the full body, parsed into an object
                const body = await bodyParse(req);
                // console.log(body);
                const newProduct = {
                        id: Date.now(),
                        ...body
                }
                const products = productService();// [{},{}]
                products.push(newProduct);// [{},{},{new}]
                createProduct(products);


                // ? 201 = Created (200 is for plain success)
                res.writeHead(201,
                        { "content-type": "application/json" } // ? header names are case-insensitive
                );
                res.end(
                        JSON.stringify({
                                message: "Products created successfully",
                                data: newProduct,
                        }),
                );
        };
}

export default productController;
