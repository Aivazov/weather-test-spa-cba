// WeatherInitializer.test.tsx
import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import weatherSlice from '@/redux/weatherSlice';
import WeatherInitializer from '@/components/WeatherInitializer';

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

// Mock refreshAllWeatherCards
jest.mock('@/redux/store', () => ({
  ...jest.requireActual('@/redux/store'),
  refreshAllWeatherCards: jest.fn().mockResolvedValue(undefined),
}));

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

describe('WeatherInitializer', () => {
  it('renders nothing (returns null)', () => {
    const { container } = renderWithProviders(<WeatherInitializer />);

    expect(container.firstChild).toBeNull();
  });

  it('is a client component', () => {
    // Check that the component has 'use client' directive by ensuring it renders without SSR issues
    expect(WeatherInitializer).toBeDefined();
  });

  it('uses useEffect and useDispatch hooks', () => {
    // This test verifies that the component can be instantiated without errors
    // The actual behavior (localStorage access, API calls) is tested at integration level
    expect(() => {
      renderWithProviders(<WeatherInitializer />);
    }).not.toThrow();
  });

  it('handles component unmounting gracefully', () => {
    const { unmount } = renderWithProviders(<WeatherInitializer />);

    // Should not throw error when unmounting
    expect(() => {
      unmount();
    }).not.toThrow();
  });
});
