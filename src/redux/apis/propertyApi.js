import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const server = import.meta.env.VITE_SERVER_URL;

export const propertyApi = createApi({
    reducerPath: "property",
    baseQuery: fetchBaseQuery({
        baseUrl: `${server}/api/v1/property`,
    }),
    endpoints: (builder)=>({
        getSingleProperty: builder.query({
            query: (id) => `${id}`,
        })
    }),
});

export const { useGetSinglePropertyQuery } = propertyApi;