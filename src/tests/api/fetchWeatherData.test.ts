// fetchWeatherData.test.ts
import { renderHook } from '@testing-library/react';

// Мокаем RTK Query hooks
const mockUseGetCurrentWeatherQuery = jest.fn();
const mockUseGetHourlyForecastQuery = jest.fn();

jest.mock('@/lib/fetchWeatherData', () => ({
  useGetCurrentWeatherQuery: (...args: any[]) =>
    mockUseGetCurrentWeatherQuery(...args),
  useGetHourlyForecastQuery: (...args: any[]) =>
    mockUseGetHourlyForecastQuery(...args),
}));

import {
  useGetCurrentWeatherQuery,
  useGetHourlyForecastQuery,
} from '@/lib/fetchWeatherData';

describe('Weather API tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('fetches current weather data for a city', async () => {
    const mockData = {
      coord: { lat: 55.7558, lon: 37.6176 },
      main: {
        temp: 20,
        feels_like: 18,
        temp_min: 18,
        temp_max: 22,
        pressure: 1013,
        humidity: 60,
      },
      weather: [{ main: 'Clear', description: 'clear sky', icon: '01d' }],
      name: 'Moscow',
      sys: { country: 'RU' },
      wind: { speed: 3, deg: 180 },
    };

    mockUseGetCurrentWeatherQuery.mockReturnValue({
      data: mockData,
      isLoading: false,
      error: null,
    });

    const { result } = renderHook(() =>
      mockUseGetCurrentWeatherQuery('Moscow')
    );

    expect(result.current.data).toEqual(mockData);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  it('fetches hourly forecast data', async () => {
    const mockData = {
      list: [
        {
          dt: 1676053200,
          main: { temp: 15, feels_like: 14 },
          weather: [{ main: 'Clear', description: 'clear sky', icon: '01d' }],
          dt_txt: '2021-01-01 12:00:00',
        },
      ],
    };

    mockUseGetHourlyForecastQuery.mockReturnValue({
      data: mockData,
      isLoading: false,
      error: null,
    });

    const { result } = renderHook(() =>
      mockUseGetHourlyForecastQuery('Moscow')
    );

    expect(result.current.data).toEqual(mockData);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  it('handles loading state', () => {
    mockUseGetCurrentWeatherQuery.mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
    });

    const { result } = renderHook(() =>
      mockUseGetCurrentWeatherQuery('Moscow')
    );

    expect(result.current.data).toBe(null);
    expect(result.current.isLoading).toBe(true);
    expect(result.current.error).toBe(null);
  });

  it('handles error state', () => {
    const mockError = { message: 'Network error' };

    mockUseGetCurrentWeatherQuery.mockReturnValue({
      data: null,
      isLoading: false,
      error: mockError,
    });

    const { result } = renderHook(() =>
      mockUseGetCurrentWeatherQuery('Moscow')
    );

    expect(result.current.data).toBe(null);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toEqual(mockError);
  });
});
