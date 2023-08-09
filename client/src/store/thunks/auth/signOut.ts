import { createAsyncThunk } from "@reduxjs/toolkit";

import auth from "../../../apis/auth";

export const signOut = createAsyncThunk('auth/signOut', async () => {
    const response = await auth.get('/signout')
    return response.data
})


