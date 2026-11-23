// * Controller: builds the response for one resource (products)
import { IncomingMessage, ServerResponse } from 'http';
import { productService } from '../service/product.service';

// TODO: branch on req.method here (GET list, POST create, PUT update, DELETE remove)
const productController = (req: IncomingMessage, res: ServerResponse) => {

        const url = req.url;
        const method = req.method;

        if (url === "/products" && method === "GET") {
                const products = [
                        {
                                id: 1,
                                name: "chair",
                                price: 40,
                        },
                        {
                                id: 2,
                                name: "table",
                                price: 50,
                        }
                ]
                productService();
                res.writeHead(200,
                        { "content-type": "application/json" } // ? header names are case-insensitive
                );
                res.end(
                        JSON.stringify({
                                message: "Products retrieved successfully", 
                                data: products,
                        }),
                );
        }



}

export default productController;
