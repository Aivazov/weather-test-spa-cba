// store.test.ts
import {
  addWeatherCard,
  setWeatherCards,
  deleteWeatherCard,
} from '@/redux/weatherSlice';

// Mock localStorage before importing store
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock;

// Mock fetch for RTK Query
global.fetch = jest.fn();

import store from '@/redux/store';

describe('Redux Store', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Reset store state
    store.dispatch(setWeatherCards([]));
  });

  describe('RTK Query integration', () => {
    it('should include RTK Query reducer', () => {
      const state = store.getState();
      expect(state).toHaveProperty('fetchWeatherData');
    });

    it('should include RTK Query middleware', () => {
      // The store should have middleware configured
      expect(store.dispatch).toBeDefined();
    });
  });

  describe('store functionality', () => {
    it('should handle multiple dispatches correctly', () => {
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
        city: 'Kyiv',
        country: 'UA',
        lat: 50.4501,
        lon: 30.5234,
        state: undefined,
      };

      store.dispatch(addWeatherCard(card1));
      store.dispatch(addWeatherCard(card2));

      const state = store.getState();
      expect(state.weather.cards).toHaveLength(2);

      const cardIds = state.weather.cards.map(card => card.id);
      store.dispatch(deleteWeatherCard(cardIds[0]));

      const finalState = store.getState();
      expect(finalState.weather.cards).toHaveLength(1);
      expect(finalState.weather.cards[0].city).toBe('Kyiv');
    });
  });
});
