import { CustomError } from "./custom-error";

export class BadGateWayError extends CustomError {
    statusCode = 502

    constructor(message?: string) {
        super(message ? message : 'Bad Gateway')

        Object.setPrototypeOf(this, BadGateWayError.prototype)
    }

    serializeErrors(): { message: string; field?: string | undefined; }[] {
        return [{message: this.message}]
    }

}