import fs from "fs";
import path from "node:path";
import type { IProduct } from "../types/product";

// * full path to db.json (cwd = folder where the server was started)
// ? path.join adds the right slashes for the OS
const filepath = path.join(process.cwd(), "./src/database/db.json")

// * Service: reads and writes the data (db.json acts as our database)
export const productService = () => {
    // console.log(process.cwd());
    // console.log(filepath);
    const result = fs.readFileSync(filepath, "utf-8"); //"utf-8"defines human readable 
    // console.log(result.toString()); // returns buffer->humadreadable by toString()

    // ? the file holds text, so JSON.parse turns it into a real array/object
    return JSON.parse(result);
};

// * saves data to db.json (writeFileSync replaces the whole file content)
export const createProduct = (payload: IProduct)=>{
    fs.writeFileSync(filepath,JSON.stringify(payload));

}