import { CustomError } from "./custom-error";

export class RequestValidationError extends CustomError {
    statusCode = 400

    constructor(public errors: {message: string, field: string}[]) {
        super('Invalid request parameter')

        Object.setPrototypeOf(this, RequestValidationError.prototype)
    }

    serializeErrors(): { message: string; field?: string | undefined; }[] {
        return this.errors.map(err => {
            return {message: err.message, field: err.field}
        })
    }

}