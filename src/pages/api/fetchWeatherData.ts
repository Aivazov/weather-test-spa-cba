import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const fetchWeatherData = createApi({
  reducerPath: 'fetchWeatherData',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/',
  }),
  endpoints: (builder) => ({
    getCurrentWeather: builder.query({
      query: (params) => {
        if (typeof params === 'string') {
          return `fetchData?city=${encodeURIComponent(params)}`;
        } else {
          return `fetchData?lat=${params.lat}&lon=${params.lon}`;
        }
      },
    }),

    getHourlyForecast: builder.query({
      query: (params) => {
        if (typeof params === 'string') {
          return `fetchData?city=${encodeURIComponent(params)}&forecast=true`;
        } else {
          return `fetchData?lat=${params.lat}&lon=${params.lon}&forecast=true`;
        }
      },
      transformResponse: (response) => {
        const today = new Date().getDate();
        console.log('forecast response', response);

        if (response.list) {
          return response.list.filter((item: any) => {
            const d = new Date(item.dt * 1000).getDate();
            return d === today;
          });
        }
        return [];
      },
    }),
  }),
});

export const {
  useGetCurrentWeatherQuery,
  useGetHourlyForecastQuery,
  useLazyGetCurrentWeatherQuery,
} = fetchWeatherData;
