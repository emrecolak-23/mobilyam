import { randomBytes } from 'crypto'

const generateAuthCode = (length = 8) => {
    return randomBytes(8).toString('hex').slice(0, 6)
}

export { generateAuthCode }