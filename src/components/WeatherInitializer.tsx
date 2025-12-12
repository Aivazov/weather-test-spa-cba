// components/WeatherInitializer.tsx
'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { refreshAllWeatherCards } from '@/redux/store';

export default function WeatherInitializer() {
  const dispatch = useDispatch();
  const [initialized, setInitialized] = useState(false);
  const cards = useSelector((state: any) => state.weather.cards);

  useEffect(() => {
    console.log(
      'WeatherInitializer: cards.length =',
      cards.length,
      'initialized =',
      initialized
    );

    // Запускаем обновление только один раз, когда карточки загружены из localStorage
    if (!initialized && cards.length > 0) {
      console.log(
        'WeatherInitializer: Found cards in store, starting refresh...'
      );
      refreshAllWeatherCards();
      setInitialized(true);
    }
  }, [cards.length, initialized]);

  return null;
}
