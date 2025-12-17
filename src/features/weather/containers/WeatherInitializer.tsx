'use client';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { refreshAllWeatherCards } from '@/store/store';

export default function WeatherInitializer() {
  const [initialized, setInitialized] = useState(false);
  const cards = useSelector((state: any) => state.weather.cards);

  useEffect(() => {
    console.log(
      'WeatherInitializer: cards.length =',
      cards.length,
      'initialized =',
      initialized
    );

    // initializing update before getting cards from the localStorage
    if (!initialized && cards.length > 0) {
      console.log('WeatherInitializer: Cards found, updating');
      refreshAllWeatherCards();
      setInitialized(true);
    }
  }, [cards.length, initialized]);

  return null;
}
