import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const fetchWeatherData = createApi({
  reducerPath: 'fetchWeatherData',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/',
  }),
  endpoints: (builder) => ({
    getCurrentWeather: builder.query({
      query: ({ city, lat, lon }) => {
        if (city) {
          return `fetchData?city=${encodeURIComponent(city)}`;
        } else if (lat && lon) {
          return `fetchData?lat=${lat}&lon=${lon}`;
        }
        throw new Error('Either city or lat/lon coordinates must be provided');
      },
    }),
    getHourlyForecast: builder.query({
      query: ({ city, lat, lon }) => {
        if (city) {
          return `fetchData?city=${encodeURIComponent(city)}&forecast=hourly`;
        } else if (lat && lon) {
          return `fetchData?lat=${lat}&lon=${lon}&forecast=hourly`;
        }
        throw new Error('Either city or lat/lon coordinates must be provided');
      },
    }),
  }),
});

export const {
  useGetCurrentWeatherQuery,
  useGetHourlyForecastQuery,
  useLazyGetCurrentWeatherQuery,
  useLazyGetHourlyForecastQuery,
} = fetchWeatherData;

export default fetchWeatherData;
