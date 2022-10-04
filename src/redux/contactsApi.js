import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const contactsApi = createApi({
    reducerPath: 'contactsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://633c5c5974afaef16407d319.mockapi.io/',
    }),
    tagTypes: ['contacts'],
    endpoints: builder => ({
        getContactsByName: builder.query({
            query: name => `contacts`,
            providesTags: ['contacts'],
        }),
        deleteContact: builder.mutation({
            query: contactId => ({
                url: `/contacts/${contactId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['contacts'],
        }),
        addContact: builder.mutation({
            query: newContact => ({
                url: '/contacts',
                method: 'POST',
                body: newContact,
            }),
            invalidatesTags: ['contacts'],
        }),
    }),
});

export const {
    useGetContactsByNameQuery,
    useDeleteContactMutation,
    useAddContactMutation,
} = contactsApi;