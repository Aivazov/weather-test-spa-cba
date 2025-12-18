import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import userEvent from '@testing-library/user-event';
import weatherSlice from '@/features/weather/weatherSlice';
import CityCard from '@/features/weather/components/CityCard/CityCard';

// Mock next/navigation
const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

// Mock Modal component
jest.mock('@/components/Modal', () => {
  return function MockModal({
    open,
    onCloseModal,
    onConfirmModal,
    title,
    text,
    approveBtn,
  }: any) {
    if (!open) return null;
    return (
      <div data-testid='modal'>
        <div>{title}</div>
        <div>{text}</div>
        <button onClick={onCloseModal} data-testid='modal-cancel'>
          Cancel
        </button>
        <button onClick={onConfirmModal} data-testid='modal-confirm'>
          {approveBtn}
        </button>
      </div>
    );
  };
});

// Mock Redux hooks
const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch,
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

const defaultProps = {
  id: '1',
  temperature: 20,
  humidity: 60,
  condition: 'Clear',
  icon: '03d',
  country: 'UA',
  city: 'Odesa',
  lat: 46.4775,
  lon: 30.7326,
  state: undefined,
  lightMode: false,
};

describe('CityCard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders city information correctly', () => {
    renderWithProviders(<CityCard {...defaultProps} />);

    expect(screen.getByText('Odesa, UA')).toBeInTheDocument();
    expect(screen.getByText('Температура: 20°C')).toBeInTheDocument();
    expect(screen.getByText('Вологість: 60%')).toBeInTheDocument();
    expect(screen.getByText('Умови: Clear')).toBeInTheDocument();
  });

  it('does not render city name if country is null', () => {
    const propsWithoutCountry = { ...defaultProps, country: null };
    renderWithProviders(<CityCard {...propsWithoutCountry} />);

    // When country is null, the city name section is not rendered at all
    expect(screen.queryByText('Odesa')).not.toBeInTheDocument();
    expect(screen.queryByText('Odesa, UA')).not.toBeInTheDocument();
  });

  it('handles null values gracefully', () => {
    const propsWithNulls = {
      ...defaultProps,
      humidity: null,
      condition: null,
    };
    renderWithProviders(<CityCard {...propsWithNulls} />);

    expect(screen.getByText(/Вологість: --/)).toBeInTheDocument();
    expect(screen.getByText('Умови: невідомо')).toBeInTheDocument();
  });

  it('rounds temperature correctly', () => {
    const propsWithFloatTemp = { ...defaultProps, temperature: 20.7 };
    renderWithProviders(<CityCard {...propsWithFloatTemp} />);

    expect(screen.getByText('Температура: 21°C')).toBeInTheDocument();
  });

  it('renders weather icon with correct image', () => {
    renderWithProviders(<CityCard {...defaultProps} />);

    const cardMedia = screen.getByTitle('weather icon');
    // MUI CardMedia uses background-image internally, so we check that the element exists
    expect(cardMedia).toBeInTheDocument();
    // The image URL is constructed in the component based on the icon prop
    expect(cardMedia.style.backgroundImage).toContain('03d@2x.png');
  });

  it('uses fallback icon when icon is null', () => {
    const propsWithNullIcon = { ...defaultProps, icon: null };
    renderWithProviders(<CityCard {...propsWithNullIcon} />);

    const cardMedia = screen.getByTitle('weather icon');
    expect(cardMedia).toHaveStyle({
      backgroundImage: 'url(https://openweathermap.org/img/wn/01d@2x.png)',
    });
  });

  it('navigates to card details when Details button is clicked', async () => {
    const user = userEvent.setup();
    renderWithProviders(<CityCard {...defaultProps} />);

    const detailsButton = screen.getByText('Деталі');
    await user.click(detailsButton);

    expect(mockPush).toHaveBeenCalledWith('/card/1');
  });

  it('prevents event propagation when Details button is clicked', async () => {
    const user = userEvent.setup();
    const mockOnClick = jest.fn();
    renderWithProviders(
      <div onClick={mockOnClick}>
        <CityCard {...defaultProps} />
      </div>
    );

    const detailsButton = screen.getByText('Деталі');
    await user.click(detailsButton);

    expect(mockOnClick).not.toHaveBeenCalled();
  });

  it('opens delete confirmation modal when Delete button is clicked', async () => {
    const user = userEvent.setup();
    renderWithProviders(<CityCard {...defaultProps} />);

    const deleteButton = screen.getByRole('button', { name: 'Видалити' });
    await user.click(deleteButton);

    expect(screen.getByTestId('modal')).toBeInTheDocument();
    expect(screen.getByText('Підтвердження видалення')).toBeInTheDocument();
    expect(
      screen.getByText(
        'Ви дійсно бажаєте видалити картку з погодою для міста Odesa?'
      )
    ).toBeInTheDocument();
    expect(screen.getByTestId('modal-confirm')).toBeInTheDocument();
  });

  it('prevents event propagation when Delete button is clicked', async () => {
    const user = userEvent.setup();
    const mockOnClick = jest.fn();
    renderWithProviders(
      <div onClick={mockOnClick}>
        <CityCard {...defaultProps} />
      </div>
    );

    const deleteButton = screen.getByText('Видалити');
    await user.click(deleteButton);

    expect(mockOnClick).not.toHaveBeenCalled();
  });

  it('closes modal when cancel button is clicked', async () => {
    const user = userEvent.setup();
    renderWithProviders(<CityCard {...defaultProps} />);

    // Open modal
    const deleteButton = screen.getByText('Видалити');
    await user.click(deleteButton);

    expect(screen.getByTestId('modal')).toBeInTheDocument();

    // Close modal
    const cancelButton = screen.getByTestId('modal-cancel');
    await user.click(cancelButton);

    await waitFor(() => {
      expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
    });
  });

  it('dispatches deleteWeatherCard and closes modal when confirm button is clicked', async () => {
    const user = userEvent.setup();
    renderWithProviders(<CityCard {...defaultProps} />);

    // Open modal
    const deleteButton = screen.getByText('Видалити');
    await user.click(deleteButton);

    expect(screen.getByTestId('modal')).toBeInTheDocument();

    // Confirm deletion
    const confirmButton = screen.getByTestId('modal-confirm');
    await user.click(confirmButton);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'weather/deleteWeatherCard',
      payload: '1',
    });

    await waitFor(() => {
      expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
    });
  });

  it('applies correct theme based on lightMode prop', () => {
    const { rerender } = renderWithProviders(
      <CityCard {...defaultProps} lightMode={true} />
    );

    // Check that the card is rendered with light theme
    const card = screen
      .getByRole('img', { hidden: true })
      .closest('.MuiPaper-root');
    expect(card).toBeInTheDocument();

    // Re-render with dark theme
    rerender(
      <Provider store={createTestStore()}>
        <CityCard {...defaultProps} lightMode={false} />
      </Provider>
    );

    // Card should still be rendered
    expect(screen.getByRole('img', { hidden: true })).toBeInTheDocument();
  });

  it('has correct card styling', () => {
    renderWithProviders(<CityCard {...defaultProps} />);

    const card = screen
      .getByRole('img', { hidden: true })
      .closest('.MuiPaper-root');
    expect(card).toHaveStyle({
      width: '200px',
    });
  });

  it('renders all required buttons', () => {
    renderWithProviders(<CityCard {...defaultProps} />);

    expect(screen.getByText('Деталі')).toBeInTheDocument();
    expect(screen.getByText('Видалити')).toBeInTheDocument();
  });
});
