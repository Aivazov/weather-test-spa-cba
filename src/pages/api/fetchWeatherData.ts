import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// На клиенте API_KEY будет undefined, поэтому создаем API роут для серверных запросов
// Но для демонстрации оставим как есть, а в компоненте будем использовать обычный fetch к нашему API

export const fetchWeatherData = createApi({
  reducerPath: 'fetchWeatherData',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/', // Используем наши API роуты вместо прямого обращения к OpenWeatherMap
  }),
  endpoints: (builder) => ({
    getCurrentWeather: builder.query({
      query: (params) => {
        // params может быть строкой (город) или объектом {lat, lon}
        if (typeof params === 'string') {
          return `fetchData?city=${encodeURIComponent(params)}`;
        } else {
          return `fetchData?lat=${params.lat}&lon=${params.lon}`;
        }
      },
    }),

    getHourlyForecast: builder.query({
      // forecast на 5 дней с шагом 3 часа (бесплатно)
      query: (params) => {
        if (typeof params === 'string') {
          return `fetchData?city=${encodeURIComponent(params)}&forecast=true`;
        } else {
          return `fetchData?lat=${params.lat}&lon=${params.lon}&forecast=true`;
        }
      },
      transformResponse: (response) => {
        // Вытаскиваем прогноз только на сегодня
        const today = new Date().getDate();
        console.log('forecast response', response);

        // Предполагаем, что response.list существует для прогноза
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

export const { useGetCurrentWeatherQuery, useGetHourlyForecastQuery } =
  fetchWeatherData;
