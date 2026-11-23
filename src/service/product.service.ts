import fs from "fs";
import path from "node:path";

const filepath = path.join(process.cwd(), "./src/database/db.json")

export const productService = () => {
    // console.log(process.cwd());
    // console.log(filepath);
    const result = fs.readFileSync(filepath, "utf-8"); //"utf-8"defines human readable 
    // console.log(result.toString()); // returns buffer->humadreadable by toString()

    return JSON.parse(result);
};