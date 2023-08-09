import mongoose from "mongoose";

export interface BrandDto {
    _id: string,
    name: string,
    tel: string,
    email: string,
    webSite: string,
    address: string,
    storeUrl: string,
    logo: string,
    startsAt: Date,
    endsAt: Date
}

// An interface that describes the properties
// that are required to create a new user

interface BrandAttrs {
    name: string,
    tel: string,
    email: string,
    webSite: string,
    address: string,
    storeUrl: string,
    logo: string,
    startsAt: Date,
    endsAt: Date
}
 
// An interface that describes the properties
// that User Model has

interface BrandModel extends mongoose.Model<BrandDoc> {
    build(attrs: BrandAttrs): BrandDoc
}

// An interface that describes the properties
// that a User Docuement has

export interface BrandDoc extends mongoose.Document {
    name: string,
    tel: string,
    email: string,
    webSite: string,
    address: string,
    storeUrl: string,
    logo: string,
    startsAt: Date,
    endsAt: Date
}

const brandsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    tel: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    webSite: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    storeUrl: {
        type: String
    },
    logo: {
        type: String
    },
    startsAt: {
        type: Date,
        required: true
    },
    endsAt: {
        type: Date,
        required: true
    },
    
}, {
    timestamps: true,
    versionKey: false
})


brandsSchema.statics.build = (attrs: BrandAttrs) => {
    return new Brand(attrs)
}

const Brand = mongoose.model<BrandDoc, BrandModel>('Brand', brandsSchema)

export { Brand }