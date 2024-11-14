import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/' }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ limit = 10, page }) => {
        const offset = page ? `&skip=${(page - 1) * limit}` : '';
        return `products?limit=${limit}${offset}`;
      },
    }),
  }),
});

export const { useGetProductsQuery } = apiSlice;
