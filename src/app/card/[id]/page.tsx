'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  createTheme,
  ThemeProvider,
  Typography,
  Box,
  CircularProgress,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CityCardDetails from '@/components/CityCardDetails/CityCardDetails';
import { updateWeatherCard } from '@/redux/weatherSlice';
import { useLazyGetCurrentWeatherQuery } from '@/pages/api/fetchWeatherData';

const darkTheme = createTheme({ palette: { mode: 'dark' } });

const CardDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const dispatch = useDispatch();

  const cardId = params?.id as string;
  const { cards } = useSelector((state: any) => state.weather);
  const card = cards.find((item: any) => item.id === cardId);

  const [trigger, { isFetching }] = useLazyGetCurrentWeatherQuery();

  // waiting for the Client to avoid hydration
  const [isClient, setIsClient] = useState(false);
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient && !weatherData) {
      // Загрузка данных погоды
    }
  }, [isClient, weatherData]);

  if (!isClient) {
    return null; // Не рендерим компонент на сервере
  }
  // END avoiding

  if (!card) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          p: 3,
        }}
      >
        <Typography variant='h4' gutterBottom>
          Картка не знайдена
        </Typography>
        <Button
          variant='contained'
          startIcon={<ArrowBackIcon />}
          onClick={() => router.push('/')}
          sx={{ mt: 2 }}
        >
          Повернутися назад
        </Button>
      </Box>
    );
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

  return (
    <ThemeProvider theme={darkTheme}>
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', p: 3 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Button
            variant='outlined'
            startIcon={<ArrowBackIcon />}
            onClick={() => router.push('/')}
            sx={{ mb: 3 }}
          >
            Назад
          </Button>
          <Button
            variant='outlined'
            loading={isFetching}
            loadingIndicator={<CircularProgress size={20} color='secondary' />}
            onClick={handleDetailsUpdate}
            sx={{ mb: 3 }}
          >
            Оновити
          </Button>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <CityCardDetails />
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default CardDetailPage;
