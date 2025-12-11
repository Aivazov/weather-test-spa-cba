// components/WeatherInitializer.tsx
'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addWeatherCard, updateWeatherCard } from '@/redux/weatherSlice';
import { useLazyGetCurrentWeatherQuery } from '@/pages/api/fetchWeatherData';

export default function WeatherInitializer() {
  const dispatch = useDispatch();
  const [loadWeather] = useLazyGetCurrentWeatherQuery();

  useEffect(() => {
    const saved = localStorage.getItem('weatherCards');
    if (!saved) return;

    const cards = JSON.parse(saved);

    // 1. Вставляем загруженные карточки в Redux
    cards.forEach((card: any) => dispatch(addWeatherCard(card)));

    // 2. Обновляем каждую через API
    cards.forEach(async (card: any) => {
      try {
        const params =
          card.lat && card.lon ? { lat: card.lat, lon: card.lon } : card.city;

        const fresh = await loadWeather(params).unwrap();

        dispatch(updateWeatherCard({ id: card.id, ...fresh }));
      } catch (error) {
        console.warn('Failed to refresh card:', error);
      }
    });
  }, []);

  return null;
}
