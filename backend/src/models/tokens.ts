import mongoose from "mongoose";



export interface Token {
    _id: string,
    verifyToken?: string,
    resetToken?: string
    userId: string,
}

// An interface that describes the properties
// that are required to create a new user

interface TokenAttrs {
    verifyToken?: string,
    resetToken?: string
    userId: string,
}

// An interface that describes the properties
// that User Model has

interface TokenModel extends mongoose.Model<TokenDoc> {
    build(attrs: TokenAttrs): TokenDoc
}

// An interface that describes the properties
// that a User Docuement has

export interface TokenDoc extends mongoose.Document {
    verifyToken: string,
    resetToken: string
    userId: string,
}

const tokenSchema = new mongoose.Schema({
    verifyToken: {
        type: String,
    },
    resetToken: {
        type: String
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
}, {
    toJSON: {
        transform(doc, ret) {
            delete ret.__v
        }
    },
    timestamps: true
})


tokenSchema.statics.build = (attrs: TokenAttrs) => {
    return new Token(attrs)
}

tokenSchema.index({createdAt: 1}, {expireAfterSeconds: 60 * 10})

const Token = mongoose.model<TokenDoc, TokenModel>('Token', tokenSchema)

export { Token }