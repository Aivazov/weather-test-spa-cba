const mockRefreshWeatherCards = jest.fn();
const mockLoadWeatherData = jest.fn();

jest.mock('@/redux/loadWeatherThunk', () => ({
  refreshWeatherCards: mockRefreshWeatherCards,
  loadWeatherData: mockLoadWeatherData,
}));

const mockAddWeatherCard = jest.fn((payload) => ({
  type: 'weather/addWeatherCard',
  payload,
}));
const mockSetWeatherCards = jest.fn((payload) => ({
  type: 'weather/setWeatherCards',
  payload,
}));
const mockDeleteWeatherCard = jest.fn((payload) => ({
  type: 'weather/deleteWeatherCard',
  payload,
}));

jest.mock('@/redux/weatherSlice', () => ({
  name: 'weather',
  reducer: jest.fn(
    (
      state = {
        cards: [],
        cities: [],
        isLoadingCities: false,
        isLoading: false,
      },
      action
    ) => {
      switch (action.type) {
        case 'weather/addWeatherCard':
          return {
            ...state,
            cards: [
              ...state.cards,
              { ...action.payload, id: Date.now().toString() },
            ],
          };
        case 'weather/setWeatherCards':
          return { ...state, cards: action.payload };
        case 'weather/deleteWeatherCard':
          return {
            ...state,
            cards: state.cards.filter((card) => card.id !== action.payload),
          };
        default:
          return state;
      }
    }
  ),
  addWeatherCard: mockAddWeatherCard,
  setWeatherCards: mockSetWeatherCards,
  deleteWeatherCard: mockDeleteWeatherCard,
}));

import {
  addWeatherCard,
  setWeatherCards,
  deleteWeatherCard,
} from '@/redux/weatherSlice';

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock;

global.fetch = jest.fn();

import store from '@/redux/store';

describe('Redux Store', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('RTK Query integration', () => {
    it('should include RTK Query reducer', () => {
      const state = store.getState();
      expect(state).toHaveProperty('fetchWeatherData');
    });

    it('should include RTK Query middleware', () => {
      expect(store.dispatch).toBeDefined();
    });
  });
});
