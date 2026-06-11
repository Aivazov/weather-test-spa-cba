// src/features/weather/components/WeatherClient/CityCardsList/CityCardsList.tsx

import { useSelector, useDispatch } from 'react-redux';
import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { setWeatherCards } from '@/features/weather/weatherSlice';
import { citCardsListContainer } from './cityCardsListStyles';
import CityCard from '../CityCard/CityCard';

interface WeatherCard {
  id: string;
  temperature: number;
  humidity: number | null;
  description: string | null;
  condition: string | null;
  icon: string | null;
  country: string | null;
  city: string;
  lat: number;
  lon: number;
  state?: string;
}

const CityCardsList = () => {
  const { cards } = useSelector((state: any) => state.weather);
  const dispatch = useDispatch();

  // waiting for the Client to avoid hydration
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const localCards = localStorage.getItem('weatherCards');
    if (localCards) {
      try {
        const cards = JSON.parse(localCards);
        dispatch(setWeatherCards(cards));
      } catch {}
    }
  }, []);

  if (!mounted) return null;
  // END avoiding

  return (
    <Box sx={citCardsListContainer}>
      {cards.map((card: WeatherCard, idx: number) => (
        <CityCard
          idx={idx}
          key={card.id}
          icon={card.icon}
          city={card.city}
          country={card.country}
          temperature={card.temperature}
          humidity={card.humidity}
          condition={card.condition}
          id={card.id}
          lat={card.lat}
          lon={card.lon}
          state={card.state}
          lightMode={false}
        />
      ))}
    </Box>
  );
};

export default CityCardsList;
