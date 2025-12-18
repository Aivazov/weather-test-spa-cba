'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  createTheme,
  ThemeProvider,
  Box,
  CircularProgress,
} from '@mui/material';
import CityCardDetails from '@/features/weather/components/CityCardDetails/CityCardDetails';
import { updateWeatherCard } from '@/features/weather/weatherSlice';
import { useLazyGetCurrentWeatherQuery } from '@/lib/fetchWeatherData';
import BgImage from '@/shared/ui/BgImage';
import NotFound from '@/app/NotFound';
import ButtonMain from '@/shared/ui/ButtonMain';
import {
  cardDetailsPageContainer,
  cardDetailsPageHeaderContainer,
  cardDetailsPageMainContainer,
} from './pageCardDetailsStyle';
import BgAnimation from '@/shared/ui/BgAnimation/BgAnimation';

const darkTheme = createTheme({ palette: { mode: 'dark' } });

const CardDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const dispatch = useDispatch();

  const cardId = params?.id as string;
  const { cards } = useSelector((state: any) => state.weather);
  const card = cards.find((item: any) => item.id === cardId);

  const [trigger, { isFetching }] = useLazyGetCurrentWeatherQuery();

  // waiting for the Client Render to avoid hydration error
  const [isClient, setIsClient] = useState(false);
  const [weatherData, setWeatherData] = useState(null);

  const handleReturnHome = () => {
    return router.push('/');
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient && !weatherData) {
      // loading weather data
    }
  }, [isClient, weatherData]);

  if (!isClient) {
    return null;
  }
  // END avoiding

  if (!card) {
    return <NotFound onReturnHome={handleReturnHome} />;
  }

  const handleDetailsUpdate = async () => {
    try {
      const res = await trigger({ lat: card.lat, lon: card.lon }).unwrap();

      dispatch(
        updateWeatherCard({
          id: card.id,
          temperature: res.main.temp,
          humidity: res.main.humidity,
          feelsLike: res.main.feels_like,
          tempMin: res.main.temp_min,
          tempMax: res.main.temp_max,
          pressure: res.main.pressure,
          windSpeed: res.wind.speed,
          windDeg: res.wind.deg,
          description: res.weather[0].description,
          condition: res.weather[0].main,
          icon: res.weather[0].icon,
          country: res.sys.country,
          city: res.name,
        })
      );
    } catch (error) {
      console.error('Помилка оновлення картки:', error);
    }
  };

  const colors = [
    '#ff5f6d',
    '#ffc3a0',
    '#ff9966',
    '#ffcc00',
    '#66ccff',
    '#6a5acd',
    '#8a2be2',
    '#00ff00',
  ];

  return (
    <ThemeProvider theme={darkTheme}>
      <Box sx={cardDetailsPageContainer}>
        {/* <BgImage
          imgSrc='https://www.weather.gov/images/owlie/SquallLine.jpg'
          imgAlt='bg-image-details'
        /> */}
        <BgAnimation colors={colors} />
        <Box sx={cardDetailsPageHeaderContainer}>
          <ButtonMain onClickHandler={handleReturnHome} option='contained'>
            Назад
          </ButtonMain>
          <Button
            variant='contained'
            loading={isFetching}
            loadingIndicator={<CircularProgress size={20} color='secondary' />}
            onClick={handleDetailsUpdate}
            sx={{ mb: 3 }}
          >
            Оновити
          </Button>
        </Box>

        <Box sx={cardDetailsPageMainContainer}>
          <CityCardDetails />
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default CardDetailPage;
