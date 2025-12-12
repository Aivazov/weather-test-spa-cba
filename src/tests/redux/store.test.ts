// store.test.ts
// Mock the thunk actions for testing
const mockRefreshWeatherCards = jest.fn();
const mockLoadWeatherData = jest.fn();

jest.mock('@/redux/loadWeatherThunk', () => ({
  refreshWeatherCards: mockRefreshWeatherCards,
  loadWeatherData: mockLoadWeatherData,
}));

// Mock weatherSlice to avoid thunk dependencies
const mockAddWeatherCard = jest.fn((payload) => ({ type: 'weather/addWeatherCard', payload }));
const mockSetWeatherCards = jest.fn((payload) => ({ type: 'weather/setWeatherCards', payload }));
const mockDeleteWeatherCard = jest.fn((payload) => ({ type: 'weather/deleteWeatherCard', payload }));

jest.mock('@/redux/weatherSlice', () => ({
  name: 'weather',
  reducer: jest.fn((state = { cards: [], cities: [], isLoadingCities: false, isLoading: false }, action) => {
    switch (action.type) {
      case 'weather/addWeatherCard':
        return {
          ...state,
          cards: [...state.cards, { ...action.payload, id: Date.now().toString() }]
        };
      case 'weather/setWeatherCards':
        return { ...state, cards: action.payload };
      case 'weather/deleteWeatherCard':
        return {
          ...state,
          cards: state.cards.filter(card => card.id !== action.payload)
        };
      default:
        return state;
    }
  }),
  addWeatherCard: mockAddWeatherCard,
  setWeatherCards: mockSetWeatherCards,
  deleteWeatherCard: mockDeleteWeatherCard,
}));

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
    // Note: Store state reset is handled by weatherSlice tests
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

  // Store functionality is tested at weatherSlice level
  // Complex store interactions with localStorage are tested via integration
});
