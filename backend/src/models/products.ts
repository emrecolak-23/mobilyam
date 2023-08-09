import mongoose from "mongoose";

export interface ProductDto {
    _id: string,
    name: string,
    description: string,
    price: number,
    url: string,
    image: string,
    model: string,
    brandId: string
}

// An interface that describes the properties
// that are required to create a new user

interface ProductAttrs {
    name: string,
    description: string,
    price: number,
    url: string,
    image: string,
    model: string,
    brandId: string
}
 
// An interface that describes the properties
// that User Model has

interface ProductModel extends mongoose.Model<ProductDoc> {
    build(attrs: ProductAttrs): ProductDoc
}

// An interface that describes the properties
// that a User Docuement has

export interface ProductDoc extends mongoose.Document {
    name: string,
    description: string,
    price: number,
    url: string,
    image: string,
    model: string,
    brandId: string
}

const productsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    image: {
        type: String,
    },
    model: {
        type: String,
        required: true
    },
    brandId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Brand",
    },
    
}, {
    timestamps: true,
    versionKey: false
})


productsSchema.statics.build = (attrs: ProductAttrs) => {
    return new Product(attrs)
}

const Product = mongoose.model<ProductDoc, ProductModel>('Product', productsSchema)

export { Product }