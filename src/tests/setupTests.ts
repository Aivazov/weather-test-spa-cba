// src/tests/setupTests.ts
import '@testing-library/jest-dom';

// Mock loadWeatherThunk globally
jest.mock('@/redux/loadWeatherThunk', () => ({
  refreshWeatherCards: jest.fn(),
  loadWeatherData: jest.fn(),
}));
