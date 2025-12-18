'use client';

import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  createTheme,
  ThemeProvider,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { deleteWeatherCard } from '@/features/weather/weatherSlice';
import Modal from '@/shared/ui/Modal';
import ButtonCard from '@/shared/ui/ButtonCard';
import { card, cardMedia } from './cityCardStyles';
import { motion } from 'framer-motion';
import FadeInFromBottom from '@/shared/framerAnimation/FadeInFromBottom';

interface WeatherCardProps {
  id: string;
  temperature: number;
  humidity: number | null;
  condition: string | null;
  icon: string | null;
  country: string | null;
  city: string;
  lat: number;
  lon: number;
  state?: string;
  lightMode: boolean;
}

type Props = WeatherCardProps;
const darkTheme = createTheme({ palette: { mode: 'dark' } });
const lightTheme = createTheme({ palette: { mode: 'light' } });

const CityCard = (props: Props) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const {
    id,
    temperature,
    humidity,
    city,
    condition,
    country,
    icon,
    // lat,
    // lon,
    // state,
    lightMode,
  } = props;
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  //avoiding hydration fail
  const safeIcon = icon ?? '01d';
  const safeTemp = Math.round(temperature) ?? '--';
  const safeHumidity = humidity ?? '--';
  const safeCondition = condition ?? 'невідомо';

  const handleDeleteClick = () => {
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    dispatch(deleteWeatherCard(id));
    setDeleteDialogOpen(false);
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
  };

  const handleMoreInfoClick = () => {
    router.push(`/card/${id}`);
  };

  return (
    <ThemeProvider theme={lightMode ? lightTheme : darkTheme}>
      <FadeInFromBottom>
        <Card sx={card}>
          <CardMedia
            sx={cardMedia}
            image={`https://openweathermap.org/img/wn/${safeIcon}@2x.png`}
            title='weather icon'
          />
          <CardContent sx={{ flexGrow: 1 }}>
            {city && country && (
              <Typography gutterBottom variant='h5' component='div'>
                {city}
                {country && `, ${country}`}
              </Typography>
            )}
            <Typography variant='body2' sx={{ color: 'text.secondary' }}>
              Температура: {safeTemp}°C
            </Typography>
            <Typography variant='body2' sx={{ color: 'text.secondary' }}>
              Вологість: {safeHumidity}%
            </Typography>
            <Typography variant='body2' sx={{ color: 'text.secondary' }}>
              Умови: {safeCondition}
            </Typography>
          </CardContent>
          <CardActions>
            <ButtonCard handler={handleMoreInfoClick} color='primary'>
              Деталі
            </ButtonCard>
            <ButtonCard handler={handleDeleteClick} color='error'>
              Видалити
            </ButtonCard>
          </CardActions>
        </Card>
      </FadeInFromBottom>

      <Modal
        open={deleteDialogOpen}
        onCloseModal={handleDeleteCancel}
        onConfirmModal={handleDeleteConfirm}
        title='Підтвердження видалення'
        text={`Ви дійсно бажаєте видалити картку з погодою для міста ${city}?`}
        approveBtn='Видалити'
      />
    </ThemeProvider>
  );
};

export default CityCard;
