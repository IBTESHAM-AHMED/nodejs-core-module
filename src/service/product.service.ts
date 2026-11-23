import path from "node:path";

const filepath = path.join(process.cwd(),"./src/database/db.json")

export const productService = () =>{
    console.log(process.cwd());

    console.log (filepath);
}