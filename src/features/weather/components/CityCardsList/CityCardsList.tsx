import { useSelector, useDispatch } from 'react-redux';
import { Typography, Box } from '@mui/material';
import CityCard from '../CityCard/CityCard';
import { useEffect, useState } from 'react';
import { setWeatherCards } from '@/features/weather/weatherSlice';
import { citCardsListContainer } from './cityCardsListStyles';

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

  // if (cards.length === 0) {
  //   return (
  //     <Box className='text-center text-gray-500 dark:text-gray-400'>
  //       <Typography variant='h6' component='p'>
  //         Введіть назву міста в поле пошуку вище
  //       </Typography>
  //     </Box>
  //   );
  // }

  return (
    <Box sx={citCardsListContainer}>
      {cards.map((card: WeatherCard) => (
        <CityCard
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
