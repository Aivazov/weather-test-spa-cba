const mockLoadWeatherData = {
  pending: { type: 'weather/loadWeatherData/pending' },
  fulfilled: { type: 'weather/loadWeatherData/fulfilled', payload: [] },
  rejected: { type: 'weather/loadWeatherData/rejected' },
};

const mockRefreshWeatherCards = {
  pending: { type: 'weather/refreshWeatherCards/pending' },
  fulfilled: { type: 'weather/refreshWeatherCards/fulfilled', payload: [] },
  rejected: { type: 'weather/refreshWeatherCards/rejected' },
};

jest.mock('@/redux/loadWeatherThunk', () => ({
  refreshWeatherCards: mockRefreshWeatherCards,
  loadWeatherData: mockLoadWeatherData,
}));

import weatherSlice, {
  addWeatherCard,
  deleteWeatherCard,
  setCities,
  setLoadingCities,
  clearCities,
  updateWeatherCard,
  setWeatherCards,
} from '@/features/weather/weatherSlice';

const reducer = weatherSlice;

describe('Weather Slice', () => {
  const initialState = {
    cards: [],
    cities: [],
    isLoadingCities: false,
    isLoading: false,
  };

  it('should return the initial state', () => {
    expect(reducer(undefined, { type: undefined })).toEqual(initialState);
  });

  describe('addWeatherCard', () => {
    it('should add a new weather card', () => {
      const newCard = {
        temperature: 20,
        humidity: 60,
        feelsLike: 18,
        tempMin: 18,
        tempMax: 22,
        pressure: 1013,
        windSpeed: 3,
        windDeg: 180,
        description: 'clear sky',
        condition: 'Clear',
        icon: '01d',
        city: 'Moscow',
        country: 'RU',
        lat: 55.7558,
        lon: 37.6176,
        state: undefined,
      };

      const action = addWeatherCard(newCard);
      const result = reducer(initialState, action);

      expect(result.cards).toHaveLength(1);
      expect(result.cards[0]).toMatchObject({
        ...newCard,
        id: expect.any(String),
      });
    });

    it('should not add duplicate cards with same coordinates', () => {
      const card1 = {
        temperature: 20,
        humidity: 60,
        description: 'clear sky',
        condition: 'Clear',
        icon: '01d',
        city: 'Moscow',
        country: 'RU',
        lat: 55.7558,
        lon: 37.6176,
        state: undefined,
      };

      const card2 = {
        temperature: 25,
        humidity: 50,
        description: 'sunny',
        condition: 'Clear',
        icon: '01d',
        city: 'Moscow',
        country: 'RU',
        lat: 55.7558,
        lon: 37.6176,
        state: undefined,
      };

      let state = reducer(initialState, addWeatherCard(card1));
      state = reducer(state, addWeatherCard(card2));

      expect(state.cards).toHaveLength(1);
      expect(state.cards[0].temperature).toBe(20);
    });
  });

  describe('deleteWeatherCard', () => {
    it('should delete a weather card by id', () => {
      const card = {
        temperature: 20,
        humidity: 60,
        description: 'clear sky',
        condition: 'Clear',
        icon: '01d',
        city: 'Moscow',
        country: 'RU',
        lat: 55.7558,
        lon: 37.6176,
        state: undefined,
      };

      let state = reducer(initialState, addWeatherCard(card));
      const cardId = state.cards[0].id;

      state = reducer(state, deleteWeatherCard(cardId));

      expect(state.cards).toHaveLength(0);
    });

    it('should not affect other cards when deleting', () => {
      const card1 = {
        id: 'card1',
        temperature: 20,
        humidity: 60,
        description: 'clear sky',
        condition: 'Clear',
        icon: '01d',
        city: 'Moscow',
        country: 'RU',
        lat: 55.7558,
        lon: 37.6176,
        state: undefined,
      };

      const card2 = {
        id: 'card2',
        temperature: 25,
        humidity: 50,
        description: 'sunny',
        condition: 'Clear',
        icon: '01d',
        city: 'Kyiv',
        country: 'UA',
        lat: 50.4501,
        lon: 30.5234,
        state: undefined,
      };

      let state = reducer(initialState, setWeatherCards([card1, card2]));
      expect(state.cards).toHaveLength(2);

      state = reducer(state, deleteWeatherCard('card1'));

      expect(state.cards).toHaveLength(1);
      expect(state.cards[0].city).toBe('Kyiv');
    });
  });

  describe('setCities', () => {
    it('should set cities list', () => {
      const cities = [
        { name: 'Moscow', lat: 55.7558, lon: 37.6176, country: 'RU' },
        { name: 'Kyiv', lat: 50.4501, lon: 30.5234, country: 'UA' },
      ];

      const action = setCities(cities);
      const result = reducer(initialState, action);

      expect(result.cities).toEqual(cities);
    });
  });

  describe('setLoadingCities', () => {
    it('should set loading cities state', () => {
      const action = setLoadingCities(true);
      const result = reducer(initialState, action);

      expect(result.isLoadingCities).toBe(true);
    });
  });

  describe('clearCities', () => {
    it('should clear cities list', () => {
      const cities = [
        { name: 'Moscow', lat: 55.7558, lon: 37.6176, country: 'RU' },
      ];

      let state = reducer(initialState, setCities(cities));
      state = reducer(state, clearCities());

      expect(state.cities).toEqual([]);
    });
  });

  describe('updateWeatherCard', () => {
    it('should update weather card data', () => {
      const card = {
        temperature: 20,
        humidity: 60,
        description: 'clear sky',
        condition: 'Clear',
        icon: '01d',
        city: 'Moscow',
        country: 'RU',
        lat: 55.7558,
        lon: 37.6176,
        state: undefined,
      };

      let state = reducer(initialState, addWeatherCard(card));
      const cardId = state.cards[0].id;

      const updatedData = {
        id: cardId,
        temperature: 25,
        humidity: 50,
        description: 'partly cloudy',
        condition: 'Clouds',
        icon: '02d',
      };

      state = reducer(state, updateWeatherCard(updatedData));

      expect(state.cards[0]).toMatchObject({
        id: cardId,
        temperature: 25,
        humidity: 50,
        description: 'partly cloudy',
        condition: 'Clouds',
        icon: '02d',
        city: 'Moscow',
        lat: 55.7558,
        lon: 37.6176,
      });
    });

    it('should not update if card id not found', () => {
      const card = {
        temperature: 20,
        humidity: 60,
        description: 'clear sky',
        condition: 'Clear',
        icon: '01d',
        city: 'Moscow',
        country: 'RU',
        lat: 55.7558,
        lon: 37.6176,
        state: undefined,
      };

      let state = reducer(initialState, addWeatherCard(card));

      const updatedData = {
        id: 'non-existent-id',
        temperature: 25,
      };

      state = reducer(state, updateWeatherCard(updatedData));

      expect(state.cards[0].temperature).toBe(20);
    });
  });

  describe('setWeatherCards', () => {
    it('should replace all weather cards', () => {
      const initialCards = [
        {
          id: '1',
          temperature: 20,
          humidity: 60,
          description: 'clear sky',
          condition: 'Clear',
          icon: '01d',
          city: 'Moscow',
          country: 'RU',
          lat: 55.7558,
          lon: 37.6176,
          state: undefined,
        },
      ];

      const newCards = [
        {
          id: '2',
          temperature: 25,
          humidity: 50,
          description: 'sunny',
          condition: 'Clear',
          icon: '01d',
          city: 'Kyiv',
          country: 'UA',
          lat: 50.4501,
          lon: 30.5234,
          state: undefined,
        },
      ];

      let state = reducer(initialState, setWeatherCards(initialCards));
      state = reducer(state, setWeatherCards(newCards));

      expect(state.cards).toEqual(newCards);
    });
  });
});
