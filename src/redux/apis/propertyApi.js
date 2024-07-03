import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const server = import.meta.env.VITE_SERVER_URL;

export const propertyApi = createApi({
    reducerPath: "propertyApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${server}/api/v1/property`,
    }),
    tagTypes: ["property"],
    endpoints: (builder)=>({
        newProperty: builder.mutation({
            query: ({formData, userId}) =>({
                url: `new/${userId}`,
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: ["property"],
        }),
        getSingleProperty: builder.query({
            query: (id) => `${id}`,
            validatesTags: ["property"],
        }),
        getAllProperties: builder.query({
            query: ()=>"",
            validatesTags: ["property"],
        }),
        getSearchProperties: builder.query({
            query: ({search, sort, category, minPrice, maxPrice})=>{
                let base = `all/search?`;
                if(search) base += `search=${search}&`
                if(sort) base += `sort=${sort}&`
                if(category) base += `category=${category}&`
                if(minPrice) base += `minPrice=${minPrice}&`
                if(maxPrice) base += `maxPrice=${maxPrice}&`
                return base;
            },
            validatesTags: ["property"],
        }),
        getCategoryProperties: builder.query({
            query: (category) => `category/${category}`,
            validatesTags: ["property"],
        }),
    }),
});

export const { useGetSinglePropertyQuery, useGetAllPropertiesQuery, useGetCategoryPropertiesQuery, useGetSearchPropertiesQuery, useNewPropertyMutation } = propertyApi;