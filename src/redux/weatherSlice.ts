import { createSlice } from "@reduxjs/toolkit";

interface WeatherCard {
  id: string;
  temperature: number | null;
  humidity: number | null;
  description: string | null;
  icon: string | null;
  country: string | null;
  city: string;
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
        description: action.payload.description,
        icon: action.payload.icon,
        country: action.payload.country,
        city: action.payload.city,
      };
      state.cards.push(newCard);
    },
    removeWeatherCard: (state, action) => {
      state.cards = state.cards.filter(card => card.id !== action.payload);
    },
    setCities: (state, action) => {
      state.cities = action.payload;
    },
    setLoadingCities: (state, action) => {
      state.isLoadingCities = action.payload;
    },
    clearCities: (state) => {
      state.cities = [];
    }
  }
})

export const { addWeatherCard, removeWeatherCard, setCities, setLoadingCities, clearCities } = weatherSlice.actions;
export default weatherSlice.reducer;