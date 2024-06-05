import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const server = import.meta.env.VITE_SERVER_URL;

export const userApi = createApi({
    reducerPath: "user",
    baseQuery: fetchBaseQuery({ 
        baseUrl: `${server}/api/v1/user/`,
    }),
    endpoints: (builder) => ({
        singleUser: builder.query({
            query: (id) => `${id}`,
        }),
    }),
});

export const { useSingleUserQuery } = userApi;