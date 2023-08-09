// Import Dependencies
import mongoose from "mongoose";

import { app } from "./app";


const startUp = async () => {


    if(!process.env.DB_URI) {
        throw new Error('DB_URI must be defined')
    }

    try {
        await mongoose.connect(process.env.DB_URI)
        console.log('Connected to MongoDB')
    } catch(err) {
        console.log(err)
    }

    const PORT = process.env.PORT

    app.listen(PORT, () => {
        console.log(`Server listening on ${PORT}`)
    })

}

startUp()