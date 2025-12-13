// CityCardDetails.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import weatherSlice from '@/redux/weatherSlice';
import fetchWeatherData from '@/pages/api/fetchWeatherData';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useParams: jest.fn(),
}));

// Mock styles
jest.mock('@/components/CityCardDetails/cityCardDetailsStyles', () => ({
  cardMediaStyles: { height: 200 },
  boxMainStyles: { display: 'flex' },
  boxCommonStyles: { p: 2 },
  fontSizeSubtitle: { fontSize: '0.875rem' },
  fontSizeData: { fontSize: '1.25rem' },
}));

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

import CityCardDetails from '@/components/CityCardDetails/CityCardDetails';
import { useParams } from 'next/navigation';

const mockUseParams = useParams as jest.MockedFunction<typeof useParams>;

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

const mockCard = {
  id: '1',
  temperature: 20,
  humidity: 60,
  feelsLike: 18,
  pressure: 1013,
  windSpeed: 5,
  windDeg: 180,
  description: 'clear sky',
  condition: 'Clear',
  icon: '01d',
  city: 'Kyiv',
  country: 'UA',
  state: 'Kyiv Oblast',
  lat: 50.4501,
  lon: 30.5234,
};

describe('CityCardDetails', () => {
  beforeEach(() => {
    mockUseParams.mockReturnValue({ id: '1' });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders city details correctly', () => {
    const store = createTestStore({
      weather: {
        cards: [mockCard],
        cities: [],
        isLoadingCities: false,
      },
    });

    renderWithProviders(<CityCardDetails />, store);

    expect(screen.getByText('Kyiv, Kyiv Oblast, UA')).toBeInTheDocument();
    expect(
      screen.getByText('Координати: 50.4501, 30.5234')
    ).toBeInTheDocument();
    expect(screen.getByText('20°C')).toBeInTheDocument();
    expect(screen.getByText('Відчувається як')).toBeInTheDocument();
    expect(screen.getByText('18°C')).toBeInTheDocument();
    expect(screen.getByText('Вологість')).toBeInTheDocument();
    expect(screen.getByText('60%')).toBeInTheDocument();
    expect(screen.getByText('Тиск, мм')).toBeInTheDocument();
    expect(screen.getByText('1013')).toBeInTheDocument();
    expect(screen.getByText('Вітер, км/г')).toBeInTheDocument();
    expect(screen.getByText('18')).toBeInTheDocument(); // 5 m/s * 3.6 = 18 km/h
    expect(screen.getByText('Погодні умови')).toBeInTheDocument();
    expect(screen.getByText('clear sky')).toBeInTheDocument();
  });

  it('renders weather icon with correct background image', () => {
    const store = createTestStore({
      weather: {
        cards: [mockCard],
        cities: [],
        isLoadingCities: false,
      },
    });

    renderWithProviders(<CityCardDetails />, store);

    const cardMedia = screen.getByTitle('weather icon');
    expect(cardMedia).toHaveStyle({
      backgroundImage: 'url(https://openweathermap.org/img/wn/01d@2x.png)',
    });
  });

  it('handles missing icon gracefully', () => {
    const cardWithoutIcon = { ...mockCard, icon: null };
    const store = createTestStore({
      weather: {
        cards: [cardWithoutIcon],
        cities: [],
        isLoadingCities: false,
      },
    });

    renderWithProviders(<CityCardDetails />, store);

    const cardMedia = screen.getByTitle('weather icon');
    // When icon is null, the component should still render the CardMedia element
    expect(cardMedia).toBeInTheDocument();
  });

  it('rounds temperature values correctly', () => {
    const cardWithFloatTemp = {
      ...mockCard,
      temperature: 20.7,
      feelsLike: 18.3,
    };
    const store = createTestStore({
      weather: {
        cards: [cardWithFloatTemp],
        cities: [],
        isLoadingCities: false,
      },
    });

    renderWithProviders(<CityCardDetails />, store);

    expect(screen.getByText('21°C')).toBeInTheDocument();
    expect(screen.getByText('18°C')).toBeInTheDocument();
  });

  it('converts wind speed from m/s to km/h correctly', () => {
    const cardWithWind = { ...mockCard, windSpeed: 10 }; // 10 m/s
    const store = createTestStore({
      weather: {
        cards: [cardWithWind],
        cities: [],
        isLoadingCities: false,
      },
    });

    renderWithProviders(<CityCardDetails />, store);

    expect(screen.getByText('36')).toBeInTheDocument(); // 10 * 3.6 = 36 km/h
  });

  it('displays coordinates with 4 decimal places', () => {
    const cardWithCoords = {
      ...mockCard,
      lat: 50.4501234,
      lon: 30.5234567,
    };
    const store = createTestStore({
      weather: {
        cards: [cardWithCoords],
        cities: [],
        isLoadingCities: false,
      },
    });

    renderWithProviders(<CityCardDetails />, store);

    expect(
      screen.getByText('Координати: 50.4501, 30.5235')
    ).toBeInTheDocument();
  });

  it('handles missing optional fields gracefully', () => {
    const cardWithMissingFields = {
      ...mockCard,
      feelsLike: null,
      description: null,
    };
    const store = createTestStore({
      weather: {
        cards: [cardWithMissingFields],
        cities: [],
        isLoadingCities: false,
      },
    });

    renderWithProviders(<CityCardDetails />, store);

    expect(screen.getByText(/--/)).toBeInTheDocument(); // For missing feelsLike
    expect(screen.getByText('Неизвестно')).toBeInTheDocument(); // For missing description
  });

  it('does not display coordinates section if lat/lon are missing', () => {
    const cardWithoutCoords = {
      ...mockCard,
      lat: null,
      lon: null,
    };
    const store = createTestStore({
      weather: {
        cards: [cardWithoutCoords],
        cities: [],
        isLoadingCities: false,
      },
    });

    renderWithProviders(<CityCardDetails />, store);

    expect(screen.queryByText('Координати:')).not.toBeInTheDocument();
  });

  it('renders city name without state and country if they are missing', () => {
    const cardWithoutStateCountry = {
      ...mockCard,
      state: null,
      country: null,
    };
    const store = createTestStore({
      weather: {
        cards: [cardWithoutStateCountry],
        cities: [],
        isLoadingCities: false,
      },
    });

    renderWithProviders(<CityCardDetails />, store);

    expect(screen.getByText('Kyiv')).toBeInTheDocument();
    expect(screen.queryByText(',')).not.toBeInTheDocument();
  });

  it('uses params id to find the correct card', () => {
    mockUseParams.mockReturnValue({ id: '2' });
    const card1 = { ...mockCard, id: '1', city: 'Kyiv' };
    const card2 = { ...mockCard, id: '2', city: 'Moscow' };

    const store = createTestStore({
      weather: {
        cards: [card1, card2],
        cities: [],
        isLoadingCities: false,
      },
    });

    renderWithProviders(<CityCardDetails />, store);

    // The component should render Moscow since id '2' is selected
    expect(screen.getByText('Moscow, Kyiv Oblast, UA')).toBeInTheDocument();
  });

  it('capitalizes weather description', () => {
    const cardWithDescription = {
      ...mockCard,
      description: 'partly cloudy',
    };
    const store = createTestStore({
      weather: {
        cards: [cardWithDescription],
        cities: [],
        isLoadingCities: false,
      },
    });

    renderWithProviders(<CityCardDetails />, store);

    const descriptionElement = screen.getByText('partly cloudy');
    expect(descriptionElement).toHaveStyle({ textTransform: 'capitalize' });
  });

  it('has correct card structure', () => {
    const store = createTestStore({
      weather: {
        cards: [mockCard],
        cities: [],
        isLoadingCities: false,
      },
    });

    renderWithProviders(<CityCardDetails />, store);

    const card = screen
      .getByRole('img', { hidden: true })
      .closest('.MuiPaper-root');
    expect(card).toBeInTheDocument();
    expect(card).toHaveStyle({ maxWidth: '600px' });
  });
});
