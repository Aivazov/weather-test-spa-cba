import { configureStore } from '@reduxjs/toolkit';
import weatherReducer from './weatherSlice';
import { fetchWeatherData } from '@/pages/api/fetchWeatherData';

const store = configureStore({
  reducer: {
    weather: weatherReducer,
    [fetchWeatherData.reducerPath]: fetchWeatherData.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(fetchWeatherData.middleware),
});

export default store;
