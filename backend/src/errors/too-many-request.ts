import { CustomError } from "./custom-error";

export class TooManyRequest extends CustomError {
    statusCode = 429

    constructor(message: string) {
        super(message)

        Object.setPrototypeOf(this, TooManyRequest.prototype)
    }

    serializeErrors(): { message: string; field?: string | undefined; }[] {
        return [{message: this.message}]
    }

}