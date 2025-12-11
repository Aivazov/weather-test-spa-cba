import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
import { useParams } from 'next/navigation';
import React from 'react';
import { useSelector } from 'react-redux';

type Props = {};

const CityCardDetails = (props: Props) => {
  const params = useParams();

  const cardId = params?.id as string;
  const { cards } = useSelector((state: any) => state.weather);
  const card = cards.find((item: any) => item.id === cardId);

  return (
    <Card sx={{ maxWidth: 600, width: '100%' }}>
      <CardMedia
        sx={{ height: 300 }}
        image={
          card.icon
            ? `https://openweathermap.org/img/wn/${card.icon}@4x.png`
            : ''
        }
        title='weather icon'
      />
      <CardContent sx={{ p: 4 }}>
        <Typography
          gutterBottom
          variant='h3'
          component='div'
          align='center'
          sx={{ mb: 3 }}
        >
          {card.city}, {card.country}
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
          <Typography variant='h1' component='div' sx={{ fontWeight: 'light' }}>
            {card.temperature ? Math.round(card.temperature) : '--'}°C
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 3,
            mb: 3,
          }}
        >
          <Box
            sx={{
              textAlign: 'center',
              p: 2,
              bgcolor: 'background.paper',
              borderRadius: 2,
            }}
          >
            <Typography variant='h6' color='text.secondary'>
              Температура
            </Typography>
            <Typography variant='h4'>
              {card.temperature ? Math.round(card.temperature) : '--'}°C
            </Typography>
          </Box>

          <Box
            sx={{
              textAlign: 'center',
              p: 2,
              bgcolor: 'background.paper',
              borderRadius: 2,
            }}
          >
            <Typography variant='h6' color='text.secondary'>
              Вологість
            </Typography>
            <Typography variant='h4'>
              {card.humidity ? `${card.humidity}%` : '--'}
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            textAlign: 'center',
            p: 3,
            bgcolor: 'background.paper',
            borderRadius: 2,
          }}
        >
          <Typography variant='h6' color='text.secondary' gutterBottom>
            Погодні умови
          </Typography>
          <Typography variant='h4' sx={{ textTransform: 'capitalize' }}>
            {card.description || 'Неизвестно'}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CityCardDetails;
