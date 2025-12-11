import { createSlice } from '@reduxjs/toolkit';

interface WeatherCard {
  id: string;
  temperature: number | null;
  humidity: number | null;
  feelsLike: number | null;
  tempMin: number | null;
  tempMax: number | null;
  pressure: number | null;
  windSpeed: number | null;
  windDeg: number | null;
  description: string | null;
  icon: string | null;
  country: string | null;
  city: string;
  lat: number;
  lon: number;
  state?: string;
}

const weatherSlice = createSlice({
  name: 'weather',
  initialState: {
    cards: [] as WeatherCard[],
    cities: [],
    isLoadingCities: false,
  },
  reducers: {
    addWeatherCard: (state, action) => {
      const newCard: WeatherCard = {
        id: Date.now().toString(),
        temperature: action.payload.temperature,
        humidity: action.payload.humidity,
        feelsLike: action.payload.feelsLike,
        tempMin: action.payload.tempMin,
        tempMax: action.payload.tempMax,
        pressure: action.payload.pressure,
        windSpeed: action.payload.windSpeed,
        windDeg: action.payload.windDeg,
        description: action.payload.description,
        icon: action.payload.icon,
        country: action.payload.country,
        city: action.payload.city,
        lat: action.payload.lat,
        lon: action.payload.lon,
        state: action.payload.state,
      };
      state.cards.push(newCard);
    },
    removeWeatherCard: (state, action) => {
      state.cards = state.cards.filter((card) => card.id !== action.payload);
    },
    setCities: (state, action) => {
      state.cities = action.payload;
    },
    setLoadingCities: (state, action) => {
      state.isLoadingCities = action.payload;
    },
    clearCities: (state) => {
      state.cities = [];
    },
  },
});

export const {
  addWeatherCard,
  removeWeatherCard,
  setCities,
  setLoadingCities,
  clearCities,
} = weatherSlice.actions;
export default weatherSlice.reducer;
