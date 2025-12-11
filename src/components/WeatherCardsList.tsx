// import React from 'react';
import { useSelector } from 'react-redux';
import { Button, Card, CardActions, CardContent, CardMedia, createTheme, ThemeProvider, Typography, Box } from '@mui/material';
import CityCard from './CityCard';

interface WeatherCard {
  id: string;
  temperature: number | null;
  humidity: number | null;
  description: string | null;
  icon: string | null;
  country: string | null;
  city: string;
}

// const darkTheme = createTheme({ palette: { mode: 'dark' } });

const WeatherCardsList = () => {
  const { cards } = useSelector((state: any) => state.weather);

  if (cards.length === 0) {
    return (
      <Box className="text-center text-gray-500 dark:text-gray-400">
        <Typography variant="h6" component="p">Введите название города в поле поиска выше</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center' }}>
      {cards.map((card: WeatherCard) => (
        <CityCard key={card.id} icon={card.icon} city={card.city} country={card.country} temperature={card.temperature} humidity={card.humidity} description={card.description} id={card.id} lightMode={false} />
      ))}
    </Box>
  );
};

export default WeatherCardsList;
