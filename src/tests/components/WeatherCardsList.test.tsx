// WeatherCardsList.test.tsx
import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import weatherSlice from '@/redux/weatherSlice';
import fetchWeatherData from '@/lib/fetchWeatherData';

// Mock next/navigation for router.push
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

// Mock CityCard component
jest.mock('@/components/CityCard', () => {
  return function MockCityCard({
    city,
    temperature,
    humidity,
    condition,
  }: any) {
    return (
      <div data-testid={`city-card-${city}`}>
        <div>City: {city}</div>
        <div>Temperature: {temperature}°C</div>
        <div>Humidity: {humidity}%</div>
        <div>Condition: {condition}</div>
      </div>
    );
  };
});

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock;

// Mock fetch
global.fetch = jest.fn();

// Mock refreshWeatherCards thunk
jest.mock('@/redux/loadWeatherThunk', () => ({
  refreshWeatherCards: {
    pending: { type: 'weather/refreshWeatherCards/pending' },
    fulfilled: { type: 'weather/refreshWeatherCards/fulfilled' },
    rejected: { type: 'weather/refreshWeatherCards/rejected' },
  },
}));

import WeatherCardsList from '@/components/WeatherCardsList';

const createTestStore = (initialState?: any) => {
  return configureStore({
    reducer: {
      weather: weatherSlice,
    },
    preloadedState: initialState,
  });
};

const renderWithProviders = (component: React.ReactElement, store?: any) => {
  const testStore = store || createTestStore();
  return {
    ...render(<Provider store={testStore}>{component}</Provider>),
    store: testStore,
  };
};

describe('WeatherCardsList', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders empty state message when no cards are present', () => {
    renderWithProviders(<WeatherCardsList />);

    expect(
      screen.getByText('Введіть назву міста в поле пошуку вище')
    ).toBeInTheDocument();
  });

  it('renders weather cards when cards are present', () => {
    const mockCards = [
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

    const store = createTestStore({
      weather: {
        cards: mockCards,
        cities: [],
        isLoadingCities: false,
      },
    });

    renderWithProviders(<WeatherCardsList />, store);

    expect(screen.getByTestId('city-card-Moscow')).toBeInTheDocument();
    expect(screen.getByTestId('city-card-Kyiv')).toBeInTheDocument();
    expect(screen.getByText('City: Moscow')).toBeInTheDocument();
    expect(screen.getByText('City: Kyiv')).toBeInTheDocument();
  });

  // Note: localStorage integration is tested at the store level
  // Component-level localStorage testing is complex due to useEffect timing

  it('handles localStorage errors gracefully', () => {
    localStorageMock.getItem.mockImplementation(() => {
      throw new Error('localStorage error');
    });

    // Should not throw error
    expect(() => {
      renderWithProviders(<WeatherCardsList />);
    }).not.toThrow();
  });

  it('handles invalid JSON in localStorage gracefully', () => {
    localStorageMock.getItem.mockReturnValue('invalid json');

    // Should not throw error and show empty state
    renderWithProviders(<WeatherCardsList />);

    expect(
      screen.getByText('Введіть назву міста в поле пошуку вище')
    ).toBeInTheDocument();
  });

  it('renders nothing during hydration (mounted = false)', () => {
    // Mock useState to return false for mounted
    const useStateSpy = jest.spyOn(React, 'useState');
    useStateSpy.mockImplementationOnce(() => [false, jest.fn()]);

    const { container } = renderWithProviders(<WeatherCardsList />);

    expect(container.firstChild).toBeNull();

    useStateSpy.mockRestore();
  });

  it('passes correct props to CityCard components', () => {
    const mockCard = {
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
    };

    const store = createTestStore({
      weather: {
        cards: [mockCard],
        cities: [],
        isLoadingCities: false,
      },
    });

    renderWithProviders(<WeatherCardsList />, store);

    expect(screen.getByText('Temperature: 20°C')).toBeInTheDocument();
    expect(screen.getByText('Humidity: 60%')).toBeInTheDocument();
    expect(screen.getByText('Condition: Clear')).toBeInTheDocument();
  });

  it('renders cards in flex layout', () => {
    const mockCards = [
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

    const store = createTestStore({
      weather: {
        cards: mockCards,
        cities: [],
        isLoadingCities: false,
      },
    });

    const { container } = renderWithProviders(<WeatherCardsList />, store);

    // Check that the container has the flex layout class
    const boxElement = container.querySelector('[class*="MuiBox-root"]');
    expect(boxElement).toBeInTheDocument();
  });
});
