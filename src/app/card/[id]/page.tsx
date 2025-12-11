'use client';

import React from 'react';
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
import CityCardDetails from '@/components/CityCardDetails';
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

  const handleDetailsUpdate = () => {
    dispatch(updateWeatherCard(cardId));
    console.log('Updated');
  };

  const handleUpdate = async () => {
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
    } catch (err) {
      console.error('Помилка оновлення картки:', err);
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
            Назад до списка
          </Button>
          <Button
            variant='outlined'
            loading={isFetching}
            loadingIndicator={
              <CircularProgress size={20} color='secondary' /> // цвет спиннера
            }
            // startIcon={<ArrowBackIcon />}
            onClick={handleUpdate}
            sx={{ mb: 3 }}
          >
            Оновити
            {/* {isFetching ? 'Оновлення...' : 'Оновити'} */}
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
