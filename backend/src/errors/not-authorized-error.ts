import { CustomError } from "./custom-error";

export class NotAuthorizedError extends CustomError {
    statusCode = 401

    constructor(message?: string) {
        super(message ? message : 'Not authorized')

        Object.setPrototypeOf(this, NotAuthorizedError.prototype)
    }

    serializeErrors(): { message: string; field?: string | undefined; }[] {
        return [{message: 'Not authorized'}]
    }

}