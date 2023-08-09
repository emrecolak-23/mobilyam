import { CustomError } from "./custom-error";

export class ServerTooBusyError extends CustomError {
    statusCode = 503

    constructor(message: string) {
        super(message)

        Object.setPrototypeOf(this, ServerTooBusyError.prototype)

    }

    serializeErrors(): { message: string; field?: string | undefined; }[] {
        return [{message: this.message}]
    }

}