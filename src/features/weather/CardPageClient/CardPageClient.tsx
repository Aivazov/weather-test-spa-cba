'use client';
import BgAnimation from '@/shared/ui/BgAnimation/BgAnimation';
import ButtonMain from '@/shared/ui/ButtonMain';
import {
  Box,
  Button,
  CircularProgress,
  createTheme,
  ThemeProvider,
} from '@mui/material';
// import { useEffect, useState } from 'react';
import CityCardDetails from './components/CityCardDetails/CityCardDetails';
// import { updateWeatherCard } from '@/features/weather/store/weatherSlice';
// import { useLazyGetCurrentWeatherQuery } from '@/lib/fetchWeatherData';
import NotFoundCard from '@/features/weather/CardPageClient/components/NotFoundCard';
import { themeDeepPurple } from '@/shared/ui/BgAnimation/BgAnimationAssets';
import {
  cardDetailsPageContainer,
  cardDetailsPageHeaderContainer,
  cardDetailsPageMainContainer,
} from '@/features/weather/CardPageClient/pageCardDetailsStyle';
// import { useParams, useRouter } from 'next/navigation';
// import { useDispatch, useSelector } from 'react-redux';
import { useCardPage } from './hooks/useCardPage';

const darkTheme = createTheme({ palette: { mode: 'dark' } });

const CardPageClient = () => {
  const { 
    card, 
    isClient, 
    isFetching, 
    handleReturnHome, 
    handleDetailsUpdate 
  } = useCardPage();

  if (!isClient) {
    return null;
  }
  // const params = useParams();
  // const router = useRouter();
  // const dispatch = useDispatch();

  // const cardId = params?.id as string;
  // const { cards } = useSelector((state: any) => state.weather);
  // const card = cards.find((item: any) => item.id === cardId);

  // const [trigger, { isFetching }] = useLazyGetCurrentWeatherQuery();

  // // waiting for the Client Render to avoid hydration error
  // const [isClient, setIsClient] = useState(false);
  // const [weatherData, setWeatherData] = useState(null);

  // const handleReturnHome = () => {
  //   return router.push('/');
  // };

  // useEffect(() => {
  //   setIsClient(true);
  // }, []);

  // useEffect(() => {
  //   if (isClient && !weatherData) {
  //     // loading weather data
  //   }
  // }, [isClient, weatherData]);

  // if (!isClient) {
  //   return null;
  // }
  // END avoiding

  if (!card) {
    return <NotFoundCard onReturnHome={handleReturnHome} />;
  }

  // const handleDetailsUpdate = async () => {
  //   try {
  //     const res = await trigger({ lat: card.lat, lon: card.lon }).unwrap();

  //     dispatch(
  //       updateWeatherCard({
  //         id: card.id,
  //         temperature: res.main.temp,
  //         humidity: res.main.humidity,
  //         feelsLike: res.main.feels_like,
  //         tempMin: res.main.temp_min,
  //         tempMax: res.main.temp_max,
  //         pressure: res.main.pressure,
  //         windSpeed: res.wind.speed,
  //         windDeg: res.wind.deg,
  //         description: res.weather[0].description,
  //         condition: res.weather[0].main,
  //         icon: res.weather[0].icon,
  //         country: res.sys.country,
  //         city: res.name,
  //       }),
  //     );
  //   } catch (error) {
  //     console.error('Помилка оновлення картки:', error);
  //   }
  // };
  return (
    <ThemeProvider theme={darkTheme}>
      <Box sx={cardDetailsPageContainer}>
        {/* <BgImage
          imgSrc='https://www.weather.gov/images/owlie/SquallLine.jpg'
          imgAlt='bg-image-details'
        /> */}
        <BgAnimation colors={themeDeepPurple} />
        <Box sx={cardDetailsPageHeaderContainer}>
          <ButtonMain onClickHandler={handleReturnHome} option='contained'>
            Назад
          </ButtonMain>
          <Button
            variant='contained'
            loading={isFetching}
            loadingIndicator={<CircularProgress size={20} color='secondary' />}
            onClick={handleDetailsUpdate}
            sx={{ mb: 3 }}
          >
            Оновити
          </Button>
        </Box>

        <Box sx={cardDetailsPageMainContainer}>
          <CityCardDetails />
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default CardPageClient;
