import { createSlice } from "@reduxjs/toolkit";

interface IUSER {
    name: string;
    email: string;
    phoneNumber: string;
}

interface IRoot {
    user?: IUSER,
    themeMode?: string
}

const initialState: IRoot = {
    user: {
        name: "",
        email: "",
        phoneNumber: "",
    },
    themeMode: "light",
};

const slice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser(state, action) {
            state.user = action.payload;
        },
    },
});

export const UserActions = slice.actions;

export const reducer = slice.reducer;

export default slice;
