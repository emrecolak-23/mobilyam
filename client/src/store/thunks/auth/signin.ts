import { createAsyncThunk } from "@reduxjs/toolkit";

import auth from "../../../apis/auth";

type FormValue = {
    email: string,
    password: string
}


export const signIn = createAsyncThunk('auth/signin', async (formValues: FormValue) => {
    const response = await auth.post('/signin', formValues)

    return response.data
})