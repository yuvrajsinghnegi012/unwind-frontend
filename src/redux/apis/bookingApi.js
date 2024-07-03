import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const server = import.meta.env.VITE_SERVER_URL;

export const bookingApi = createApi({
    reducerPath: "bookingApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${server}/api/v1/booking/`,
    }),
    tagTypes: ["user"],
    endpoints: (builder)=>({
        newBooking: builder.mutation({
            query: (formData)=>({
                url: `new/${formData.userId}/${formData.propertyId}`,
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: ["user"],
        }),
    }),
});

export const { useNewBookingMutation } = bookingApi;