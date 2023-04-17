import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const hereApi = process.env.REACT_APP_HERE_API;

export const hereApiCoordLookup = createApi({
  reducerPath: 'hereApiCoordLookup',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://geocode.search.hereapi.com/v1/geocode?q=',
  }),
  endpoints: (builder) => ({
    //* Get Coordinates from location name
    getCoordinates: builder.query({
      query: (query) => `${query}&in=countryCode:GBR&apiKey=${hereApi}`,
    }),
  }),
});

export const { useGetCoordinatesQuery } = hereApiCoordLookup;
