// * Entry point: only creates the server and starts listening
// ? Flow: server.ts -> routes/route.ts -> controllers/*.controller.ts
import { createServer, IncomingMessage, Server, ServerResponse } from "http";
import routeHandler from "./routes/route";

// ? callback runs once per request: req = what the client sent, res = what we send back
const server : Server =createServer((req : IncomingMessage,res: ServerResponse)=>{
    // * hand every request to the router
    routeHandler(req,res);
})

server.listen(5000,()=>{
    console.log("Server is running Successfully!")
})
// TODO: "/?x=1" returns 404 (url === "/" fails). Use new URL() to ignore the query string
