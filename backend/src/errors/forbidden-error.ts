import { CustomError } from "./custom-error";

export class ForbiddenError extends CustomError {
    statusCode = 403

    constructor() {
        super('Forbidden operation')

        Object.setPrototypeOf(this, ForbiddenError.prototype)
    }

    serializeErrors(): { message: string; field?: string | undefined; }[] {
        return [{message: "Forbidden operation"}]
    }

}