// * Controller: handles all /products requests and sends the response
import { IncomingMessage, ServerResponse } from 'http';
import { createProduct, productService } from '../service/product.service';
import console from 'console';
import type { IProduct } from '../types/product';
import { bodyParse } from '../utils/parseBody';
import path from 'node:path';
import { sendResponse } from '../utils/sendResponse';


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
        // console.log(id);
        // * route 1: GET /products -> list all
        if (url === "/products" && method === "GET") {
                // const products = [{}];
                const products = productService();// [{},{},{}]
                sendResponse(res,true,200,"Products retrieved successfully",products);
                // res.writeHead(200,
                //         { "content-type": "application/json" } // ? header names are case-insensitive
                // );
                // res.end(
                //         JSON.stringify({
                //                 message: "Products retrieved successfully",
                //                 data: products,
                //         }),
                // );
                // * route 2: GET /products/:id -> one product
        } else if (method === "GET" && id !== null) {
                const products = productService();// [{},{},{}]
                // ? find() picks the product whose id matches the URL id
                const product = products.find((p: IProduct) => p.id === id);
                //error: if there is no product. 
                if (!product) {
                        res.writeHead(404,
                                { "content-type": "application/json" } // ? header names are case-insensitive
                        );
                        res.end(
                                JSON.stringify({
                                        message: "Product Not Found!",

                                }),
                        );
                }
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
                // console.log(body);
                // ? wait for the full body, parsed into an object
                const body = await bodyParse(req);
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
                // * route 4: PUT /products/:id -> update one product (reads the JSON body)
        } else if (method === "PUT" && id !== null) {

                const body = await bodyParse(req);
                const products = productService();// [{},{}]
                const index = products.findIndex((p: IProduct) => p.id === id);
                // console.log(index);
                if (index < 0) {
                        res.writeHead(404,
                                { "content-type": "application/json" } // ? header names are case-insensitive
                        );
                        res.end(
                                JSON.stringify({
                                        message: "Product Not Found!",

                                }),
                        );
                }
                // console.log(products[index]); //? shows the product data for that index

                // * replaces the product with the new body but keep its original id (id first, so body can't override it)
                products[index] = { id: products[index].id, ...body }; //?
                createProduct(products);

                res.writeHead(200,
                        { "content-type": "application/json" } // ? header names are case-insensitive
                );
                res.end(
                        JSON.stringify({
                                message: "Products updated successfully",
                                data: products[index],
                        }),
                );
                // * route 5: DELETE /products/:id -> remove one product
        } else if (method === "DELETE" && id !== null) {
                const products = productService();
                const index = products.findIndex((p: IProduct) => p.id === id);

                if (id < 0) {
                        res.writeHead(404,
                                { "content-type": "application/json" } // ? header names are case-insensitive
                        );
                        res.end(
                                JSON.stringify({
                                        message: "Product Not Found!!",
                                }),
                        );
                }

                // const arr = ["a","b","c"]
                // console.log(arr.splice(1,2)); // [ 'b', 'c' ]
                // console.log(arr); // [ 'a' ]
                //? splice(index, 1) removes 1 item at index -> [{1},{2},{3}] -> [{1},{3}], then save the array to db.json
                products.splice(index, 1);
                createProduct(products);
                res.writeHead(200,
                        { "content-type": "application/json" } // ? header names are case-insensitive
                );
                res.end(
                        JSON.stringify({
                                message: "Products Deleted Successfully",

                        }),
                );

        };
}

export default productController;
