import {Request} from "./request.ts";


export class Response {
    private request: Request;
    public statusCode = 200;
    public body = '';
    public headers: Headers = new Headers()

    constructor({request}: { request: Request }) {
        this.request = request
    }

    status(statusCode: number): Response {
        this.statusCode = statusCode
        return this
    }

    json(content: Record<string, unknown>): Response {
        this.request.headers.set("content-type", "application/json");
        this.body = JSON.stringify(content)
        this.request.denoRequest.respond({body: this.body, headers: this.headers, status: this.statusCode});
        return this
    }
}
