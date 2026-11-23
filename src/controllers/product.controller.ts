// * Controller: builds the response for one resource (products)
import { IncomingMessage, ServerResponse } from 'http';
import { productService } from '../service/product.service';
import console from 'console';
import type { IProduct } from '../types/product';

// TODO: branch on req.method here (GET list, POST create, PUT update, DELETE remove)
const productController = (req: IncomingMessage, res: ServerResponse) => {

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
                const product = products.find((p:IProduct)=>p.id===id);
                res.writeHead(200,
                        { "content-type": "application/json" } // ? header names are case-insensitive
                );
                res.end(
                        JSON.stringify({
                                message: "Products retrieved successfully",
                                data: product,
                        }),
                );
        }else if(method==="POST"){};
}

export default productController;
