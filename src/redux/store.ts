import { configureStore } from '@reduxjs/toolkit';
import weatherReducer from './weatherSlice';
import fetchWeatherData from '@/lib/fetchWeatherData';

const loadState = () => {
  // Проверяем, что мы на клиенте (localStorage доступен)
  if (typeof window === 'undefined') {
    console.log('loadState: Running on server, skipping localStorage');
    return undefined;
  }

  try {
    const serializedCards = localStorage.getItem('weatherCards');
    if (!serializedCards) {
      console.log('loadState: No weatherCards in localStorage');
      return undefined;
    }

    const parsedCards = JSON.parse(serializedCards);
    console.log(
      'loadState: Loaded',
      parsedCards.length,
      'cards from localStorage'
    );
    return {
      weather: {
        cards: parsedCards,
        cities: [],
        isLoadingCities: false,
        isLoading: false,
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

// Функция для обновления всех карточек погоды из localStorage
export const refreshAllWeatherCards = async () => {
  console.log('refreshAllWeatherCards: Starting...');

  // Проверяем, что мы на клиенте
  if (typeof window === 'undefined') {
    console.log('refreshAllWeatherCards: Running on server, skipping');
    return;
  }

  try {
    const serializedCards = localStorage.getItem('weatherCards');
    if (!serializedCards) {
      console.log('refreshAllWeatherCards: No serializedCards in localStorage');
      return;
    }

    const cards = JSON.parse(serializedCards);
    console.log('refreshAllWeatherCards: Found', cards.length, 'cards');

    if (cards.length > 0) {
      // Динамический импорт для избежания циклических зависимостей
      const { refreshWeatherCards } = await import('./loadWeatherThunk');
      console.log('refreshAllWeatherCards: Dispatching refreshWeatherCards...');
      const result = await store.dispatch(refreshWeatherCards(cards));
      console.log('Weather cards refreshed successfully', result);
    }
  } catch (error) {
    console.error('Error refreshing weather cards:', error);
  }
};

// Подписка на изменения store для синхронизации с localStorage
if (typeof window !== 'undefined') {
  store.subscribe(() => {
    try {
      const state = store.getState();
      localStorage.setItem('weatherCards', JSON.stringify(state.weather.cards));
    } catch (error) {
      console.log('Error saving in the localStorage', error);
    }
  });
}

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
