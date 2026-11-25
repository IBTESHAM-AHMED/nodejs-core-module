import { resolve } from "dns";
import type { IncomingMessage } from "http";

// * Util: reads the request body and returns it as a parsed JSON object
// ? the body does NOT arrive all at once; Node streams it in chunks, so we collect them first
export const bodyParse = (req: IncomingMessage):
    Promise<any> => {
    let body = "";
    // ? Promise lets the controller use `await` instead of event callbacks
    return new Promise((resolve, reject) => {
        // * "data" fires once per chunk
        req.on("data", (chunk) => {
            body += chunk; // body = body + chunk
        });
        // * "end" fires when the whole body has arrived, only now is it safe to parse
        req.on("end", () => {
            try {
                resolve(JSON.parse(body));
            } catch (error) {
                // ? if the body isn't valid JSON, reject so the caller knows it failed
                reject(error);
            }
        });
    });
};