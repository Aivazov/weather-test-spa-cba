import { configureStore } from '@reduxjs/toolkit';
import weatherReducer from './weatherSlice';
import { fetchWeatherData } from '@/pages/api/fetchWeatherData';

const loadState = () => {
  try {
    const serializedCards = localStorage.getItem('weatherCards');
    if (!serializedCards) return undefined;
    console.log('serializedCards Store parse', JSON.parse(serializedCards));

    return {
      weather: {
        cards: JSON.parse(serializedCards),
        cities: [],
        isLoadingCities: false,
      },
    };
  } catch (error) {
    console.log('Error loading from the localStorage', error);
    return undefined;
  }
};

const store = configureStore({
  reducer: {
    weather: weatherReducer,
    [fetchWeatherData.reducerPath]: fetchWeatherData.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(fetchWeatherData.middleware),
  preloadedState: loadState(),
});

store.subscribe(() => {
  try {
    const state = store.getState();
    localStorage.setItem('weatherCards', JSON.stringify(state.weather.cards));
  } catch (error) {
    console.log('Error saving in the localStorage', error);
  }
});
export default store;
