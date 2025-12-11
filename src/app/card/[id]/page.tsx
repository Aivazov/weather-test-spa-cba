'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { Button, Card, CardContent, CardMedia, createTheme, ThemeProvider, Typography, Box } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CityCardDetails from '@/components/CityCardDetails';

const darkTheme = createTheme({ palette: { mode: 'dark' } });

const CardDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const cardId = params?.id as string;

  const { cards } = useSelector((state: any) => state.weather);
  const card = cards.find((c: any) => c.id === cardId);

  if (!card) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Карточка не найдена
        </Typography>
        <Button
          variant="contained"
          startIcon={<ArrowBackIcon />}
          onClick={() => router.push('/')}
          sx={{ mt: 2 }}
        >
          Вернуться назад
        </Button>
      </Box>
    );
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', p: 3 }}>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={() => router.push('/')}
          sx={{ mb: 3 }}
        >
          Назад к списку
        </Button>

        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <CityCardDetails />
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default CardDetailPage;
