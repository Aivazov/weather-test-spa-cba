'use client';

import { useEffect, useState } from 'react';
import { updateWeatherCard } from '@/features/weather/store/weatherSlice';
import { useLazyGetCurrentWeatherQuery } from '@/lib/fetchWeatherData';
import { useParams, useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';

export const useCardPage = () => {

  const params = useParams();
  const router = useRouter();
  const dispatch = useDispatch();

  const cardId = params?.id as string;
  const { cards } = useSelector((state: any) => state.weather);
  const card = cards.find((item: any) => item.id === cardId);

  const [trigger, { isFetching }] = useLazyGetCurrentWeatherQuery();

  // waiting for the Client Render to avoid hydration error
  const [isClient, setIsClient] = useState(false);
  // const [weatherData, setWeatherData] = useState(null);

  const handleReturnHome = () => {
    return router.push('/');
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  // useEffect(() => {
  //   if (isClient && !weatherData) {
  //     // loading weather data
  //   }
  // }, [isClient, weatherData]);

  // if (!isClient) {
  //   return null;
  // }
  // END avoiding

  const handleDetailsUpdate = async () => {
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
        }),
      );
    } catch (error) {
      console.error('Помилка оновлення картки:', error);
    }
  };

  return {
    card,
    isClient,
    isFetching,
    handleReturnHome,
    handleDetailsUpdate,
  }
}