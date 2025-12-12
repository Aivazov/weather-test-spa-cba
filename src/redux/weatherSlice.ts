import { createSlice } from '@reduxjs/toolkit';

interface WeatherCard {
  // id: number;
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
  condition: string | null;
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
        // id: action.payload.id,
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
        condition: action.payload.condition,
        icon: action.payload.icon,
        country: action.payload.country,
        city: action.payload.city,
        lat: action.payload.lat,
        lon: action.payload.lon,
        state: action.payload.state,
      };
      const cardExists = state.cards.some(
        (card) => card.lat === newCard.lat && card.lon === newCard.lon
      );
      // const cardExists = state.cards.some((card) => card.id === newCard.id);
      console.log('newCard', newCard);
      // console.log('cardExists', cardExists);

      if (!cardExists) {
        state.cards.push(newCard);
      }
    },
    deleteWeatherCard: (state, action) => {
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
    updateWeatherCard: (state, action) => {
      const idx = state.cards.findIndex(
        (card) => card.id === action.payload.id
      );
      if (idx !== -1) {
        state.cards[idx] = {
          ...state.cards[idx],
          ...action.payload,
          id: state.cards[idx].id,
        };
      }
    },
    setWeatherCards: (state, action) => {
      state.cards = action.payload;
    },
  },
});

export const {
  addWeatherCard,
  deleteWeatherCard,
  setCities,
  setLoadingCities,
  clearCities,
  updateWeatherCard,
  setWeatherCards,
} = weatherSlice.actions;
export default weatherSlice.reducer;
