import { configureStore } from "@reduxjs/toolkit";

import userSlice from "./slices/user";
import { userApi } from "./apis/userApi";

export const store = configureStore({
    reducer: {
        [userSlice.name]: userSlice.reducer,
        [userApi.reducerPath]: userApi.reducer,
    },

    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: (mid) =>[
        ...mid(),
        userApi.middleware,
    ],
});