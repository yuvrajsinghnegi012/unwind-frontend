import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const server = import.meta.env.VITE_SERVER_URL;

export const propertyApi = createApi({
    reducerPath: "property",
    baseQuery: fetchBaseQuery({
        baseUrl: `${server}/api/v1/property`,
    }),
    endpoints: (builder)=>({
        newProperty: builder.mutation({
            query: ({formData, userId}) =>({
                url: `new/${userId}`,
                method: 'POST',
                body: formData,
            }),
        }),
        getSingleProperty: builder.query({
            query: (id) => `${id}`,
        }),
        getAllProperties: builder.query({
            query: ()=>"",
        }),
        getCategoryProperties: builder.query({
            query: (category) => `category/${category}`,
        })
    }),
});

export const { useGetSinglePropertyQuery, useGetAllPropertiesQuery, useGetCategoryPropertiesQuery, useNewPropertyMutation } = propertyApi;