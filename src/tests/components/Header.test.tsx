// Header.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import weatherSlice from '@/redux/weatherSlice';
import { fetchWeatherData } from '@/pages/api/fetchWeatherData';

// Mock SCSS modules
jest.mock('@/components/Header/Header.module.scss', () => ({
  header: 'header',
}));

// Mock SearchBar component
jest.mock('@/components/SearchBar/SearchBar', () => {
  return function MockSearchBar() {
    return <div data-testid="search-bar">Search Bar Component</div>;
  };
});

// Mock fetch
global.fetch = jest.fn();

import Header from '@/components/Header/Header';

const createTestStore = (initialState?: any) => {
  return configureStore({
    reducer: {
      weather: weatherSlice,
      [fetchWeatherData.reducerPath]: fetchWeatherData.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(fetchWeatherData.middleware),
    preloadedState: initialState,
  });
};

const renderWithProviders = (component: React.ReactElement, store?: any) => {
  const testStore = store || createTestStore();
  return {
    ...render(
      <Provider store={testStore}>
        {component}
      </Provider>
    ),
    store: testStore,
  };
};

describe('Header', () => {
  it('renders header element', () => {
    renderWithProviders(<Header />);

    const headerElement = screen.getByRole('banner'); // header elements have role="banner"
    expect(headerElement).toBeInTheDocument();
  });

  it('renders SearchBar component', () => {
    renderWithProviders(<Header />);

    expect(screen.getByTestId('search-bar')).toBeInTheDocument();
    expect(screen.getByText('Search Bar Component')).toBeInTheDocument();
  });

  it('has correct CSS class', () => {
    renderWithProviders(<Header />);

    const headerElement = screen.getByRole('banner');
    expect(headerElement).toHaveClass('header');
  });

  it('renders as header tag', () => {
    renderWithProviders(<Header />);

    const headerElement = screen.getByRole('banner');
    expect(headerElement.tagName).toBe('HEADER');
  });

  it('contains search bar as direct child', () => {
    renderWithProviders(<Header />);

    const headerElement = screen.getByRole('banner');
    const searchBar = screen.getByTestId('search-bar');

    expect(headerElement).toContainElement(searchBar);
  });
});
