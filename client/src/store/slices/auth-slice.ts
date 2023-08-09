import { createSlice } from "@reduxjs/toolkit";

import { signIn } from "../thunks/auth/signin";
import { currentUser } from "../thunks/auth/currentUser";
import { signOut } from "../thunks/auth/signOut";

export type UserData = {
    email: string,
    password: string,
    role?: string,
    brandId?: string 
}

interface INITIAL_STATE {
    currentUser: UserData | null,
    isLoading: boolean,
    error: string | null | undefined
}


const initialState: INITIAL_STATE = {
    currentUser: null,
    isLoading: false,
    error: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {

    },
    extraReducers(builder) {
        builder.addCase(signIn.pending, (state, _) => {
            state.isLoading = true
            state.error = null
        });
        builder.addCase(signIn.fulfilled, (state, action) => {
            state.isLoading = false
            state.currentUser = action.payload
        });
        builder.addCase(signIn.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.error.message
        })
        builder.addCase(currentUser.pending, (state, _) => {
            state.isLoading = true
            state.error = null
        })
        builder.addCase(currentUser.fulfilled, (state, action) => {
            state.isLoading = false
            state.currentUser = action.payload
        })
        builder.addCase(currentUser.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.error.message
        })
        builder.addCase(signOut.pending, (state, _) => {
            state.isLoading = false
            state.error = null
        })
        builder.addCase(signOut.fulfilled, (state, _) => {
            state.isLoading = false
            state.currentUser = null
        })
        builder.addCase(signOut.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.error.message
        })
    }
})


export const authReducer = authSlice.reducer

export * from '../thunks/auth/signin'
export * from '../thunks/auth/currentUser'
export * from '../thunks/auth/signOut'
