import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const server = import.meta.env.VITE_SERVER_URL;

export const bookingApi = createApi({
    reducerPath: "booking",
    baseQuery: fetchBaseQuery({
        baseUrl: `${server}/api/v1/booking/`,
    }),
    endpoints: (builder)=>({
        newBooking: builder.mutation({
            query: (formData)=>({
                url: `new/${formData.userId}/${formData.propertyId}`,
                method: 'POST',
                body: formData,
            }),
        }),
    }),
});

export const { useNewBookingMutation } = bookingApi;