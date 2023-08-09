import mongoose from "mongoose";
import { Password } from "../services/Password";

export interface UserDto {
    _id: string,
    email: string,
    isActive: boolean,
    role?: string
}

// An interface that describes the properties
// that are required to create a new user

interface UserAttrs {
    email: string,
    password: string,
    role?: string,
    brandId?: string 
}
 
// An interface that describes the properties
// that User Model has

interface UserModel extends mongoose.Model<UserDoc> {
    build(attrs: UserAttrs): UserDoc
}

// An interface that describes the properties
// that a User Docuement has

export interface UserDoc extends mongoose.Document {
    email: string,
    password?: string
    isActive: boolean,
    role: string
    brandId?: string
}

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
    },
    isActive: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        enum: ['brand', 'admin', 'superAdmin'],
        default: 'brand'
    },
    brandId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Brand",
    },
    
}, {
    toJSON: {
        transform(doc, ret) {
            delete ret.password
            delete ret.__v
        }
    },
    timestamps: true
})


userSchema.pre('save', async function(next) {
    if(this.isModified('password')) {
        const hashed = await Password.toHash(this.get('password'))
        this.set('password', hashed)
    }
})

userSchema.statics.build = (attrs: UserAttrs) => {
    return new User(attrs)
}

const User = mongoose.model<UserDoc, UserModel>('User', userSchema)

export { User }