// src/features/weather/components/WeatherClient/CityCardsList/CityCardsList.tsx

// src/features/weather/components/WeatherClient/CityCardsList/CityCardsList.tsx
import { useDispatch } from 'react-redux';
// import { useAppSelector } from '@/shared/hooks/redux'; // Используем наш типизированный useSelector
import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { WeatherCard, setWeatherCards } from '@/features/weather/store/weatherSlice';
import { citCardsListContainer } from './cityCardsListStyles';
import CityCard from '../CityCard/CityCard';
import { useAppSelector } from '@/redux/hooks/useAppSelector';
import EmptyCardsState from '../EmptyCardsState/EmptyCardsState';
// import EmptyCardsState from './EmptyCardsState'; // Импортируем заглушку

// interface WeatherCard {
//   id: string;
//   temperature: number | ;
//   humidity: number | null;
//   description: string | null;
//   condition: string | null;
//   icon: string | null;
//   country: string | null;
//   city: string;
//   lat: number;
//   lon: number;
//   state?: string;
// }

const CityCardsList = () => {
  // Убрали : any, теперь стейт типизирован
  const { cards } = useAppSelector((state) => state.weather);
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
        const parsedCards = JSON.parse(localCards);
        dispatch(setWeatherCards(parsedCards));
      } catch {}
    }
  }, []);
// }, [dispatch]);

  if (!mounted) return null;
  // END avoiding

  // UX: Если список карточек пуст, показываем красивый онбординг
  if (cards.length === 0) {
    return <EmptyCardsState />;
  }

  return (
    <Box sx={citCardsListContainer}>
      {cards.map((card: WeatherCard, idx: number) => (
        <CityCard
          idx={idx}
          key={card.id}
          icon={card.icon}
          city={card.city}
          country={card.country}
          temperature={card.temperature ?? 0}
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

// import { useSelector, useDispatch } from 'react-redux';
// import { Box } from '@mui/material';
// import { useEffect, useState } from 'react';
// import { setWeatherCards } from '@/features/weather/store/weatherSlice';
// import { citCardsListContainer } from './cityCardsListStyles';
// import CityCard from '../CityCard/CityCard';

// interface WeatherCard {
//   id: string;
//   temperature: number;
//   humidity: number | null;
//   description: string | null;
//   condition: string | null;
//   icon: string | null;
//   country: string | null;
//   city: string;
//   lat: number;
//   lon: number;
//   state?: string;
// }

// const CityCardsList = () => {
//   const { cards } = useSelector((state: any) => state.weather);
//   const dispatch = useDispatch();

//   // waiting for the Client to avoid hydration
//   const [mounted, setMounted] = useState(false);
//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   useEffect(() => {
//     const localCards = localStorage.getItem('weatherCards');
//     if (localCards) {
//       try {
//         const cards = JSON.parse(localCards);
//         dispatch(setWeatherCards(cards));
//       } catch {}
//     }
//   }, []);

//   if (!mounted) return null;
//   // END avoiding

//   return (
//     <Box sx={citCardsListContainer}>
//       {cards.map((card: WeatherCard, idx: number) => (
//         <CityCard
//           idx={idx}
//           key={card.id}
//           icon={card.icon}
//           city={card.city}
//           country={card.country}
//           temperature={card.temperature}
//           humidity={card.humidity}
//           condition={card.condition}
//           id={card.id}
//           lat={card.lat}
//           lon={card.lon}
//           state={card.state}
//           lightMode={false}
//         />
//       ))}
//     </Box>
//   );
// };

// export default CityCardsList;
