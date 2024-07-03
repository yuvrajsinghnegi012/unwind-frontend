import { configureStore } from "@reduxjs/toolkit";
import { bookingApi } from "./apis/bookingApi";
import { propertyApi } from "./apis/propertyApi";
import { userApi } from "./apis/userApi";
import userSlice from "./slices/user";

export const store = configureStore({
    reducer: {
        [userSlice.name]: userSlice.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [propertyApi.reducerPath]: propertyApi.reducer,
        [bookingApi.reducerPath]: bookingApi.reducer,
    },

    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: (mid) =>[
        ...mid(),
        userApi.middleware,
        propertyApi.middleware,
        bookingApi.middleware,
    ],
});