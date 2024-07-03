import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const server = import.meta.env.VITE_SERVER_URL;

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${server}/api/v1/user/`,
    }),
    tagTypes: ["user"],
    endpoints: (builder) => ({
        signUp: builder.mutation({
            query: (formData) => ({
                url: 'new',
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: ["user"],
        }),
        login: builder.mutation({
            query: (formData) => ({
                url: "login",
                method: "POST",
                body: formData,
                invalidatesTags: ["user"],
            })
        }),
        singleUser: builder.query({
            query: (id) => `${id}`,
            invalidatesTags: ["user"],
        }),
        toggleWishlistProperty: builder.mutation({
            query: ({ userId, propertyId }) => ({
                url: `wishlist/${userId}/${propertyId}`,
                method: `POST`,
            }),
            invalidatesTags: ["user"],
        }),
        getWishlist: builder.query({
            query: (userId) => `wishlist/${userId}`,
            providesTags: ["user"]
        }),
        getTriplist: builder.query({
            query: (userId) => `triplist/${userId}`,
            providesTags: ["user"]
        }),
        getPropertiesList: builder.query({
            query: (userId) => `propertieslist/${userId}`,
            providesTags: ["user"],
        }),
        logout: builder.mutation({
            query: () => ({
                url: "logout",
                method: 'POST',
            }),
            invalidatesTags: ['user'],
        }),
    }),
});

export const { useSingleUserQuery, useSignUpMutation, useLoginMutation, useToggleWishlistPropertyMutation, useGetWishlistQuery, useGetTriplistQuery, useGetPropertiesListQuery, useLogoutMutation } = userApi;