import '@testing-library/jest-dom';

jest.mock('@/redux/loadWeatherThunk', () => ({
  refreshWeatherCards: jest.fn(),
  loadWeatherData: jest.fn(),
}));
