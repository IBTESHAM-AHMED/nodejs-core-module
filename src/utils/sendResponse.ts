import type { ServerResponse } from "http";

export const sendResponse = (
    res: ServerResponse,
    success: boolean,
    statusCode: number,
    message: string,
    data?:any,
) => {
    const response={
        success,
        // statusCode, // no need writehead directly
        message,
        data
    }
    res.writeHead(statusCode,
        { "content-type": "application/json" } // ? header names are case-insensitive
    );
    res.end(
        JSON.stringify(response),
    );
}