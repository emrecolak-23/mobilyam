import { createAsyncThunk } from "@reduxjs/toolkit";

import auth from "../../../apis/auth";


export const currentUser = createAsyncThunk('auth/currentuser', async () => {
    const response = await auth.get('/currentuser')
    return response.data
})