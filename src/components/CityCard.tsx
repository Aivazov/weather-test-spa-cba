import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  createTheme,
  ThemeProvider,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { removeWeatherCard } from '@/redux/weatherSlice';
import Modal from '@/components/Modal';

interface WeatherCardProps {
  id: string;
  temperature: number | null;
  humidity: number | null;
  description: string | null;
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
    description,
    country,
    icon,
    lat,
    lon,
    state,
    lightMode,
  } = props;
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleDeleteClick = () => {
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    dispatch(removeWeatherCard(id));
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
      <Card
        sx={{
          maxWidth: 300,
          border: '1px solid #58595c',
          borderRadius: '20px',
          cursor: 'pointer',
        }}
      >
        <CardMedia
          sx={{
            height: 120,
            objectFit: 'contain',
          }}
          image={`https://openweathermap.org/img/wn/${icon}@2x.png`}
          title='weather icon'
        />
        <CardContent>
          {city && country && (
            <Typography gutterBottom variant='h5' component='div'>
              {city}
              {country && `, ${country}`}
            </Typography>
          )}
          {/* {(lat || lon) && (
            <Typography
              variant='body2'
              sx={{ color: 'text.secondary', fontSize: '0.75rem' }}
            >
              Координати: {lat?.toFixed(4)}, {lon?.toFixed(4)}
            </Typography>
          )} */}
          {temperature && (
            <Typography variant='body2' sx={{ color: 'text.secondary' }}>
              Температура: {temperature ? Math.round(temperature) : '--'}°C
            </Typography>
          )}
          {humidity && (
            <Typography variant='body2' sx={{ color: 'text.secondary' }}>
              Вологість: {humidity}%
            </Typography>
          )}
          {description && (
            <Typography variant='body2' sx={{ color: 'text.secondary' }}>
              Умови: {description}
            </Typography>
          )}
        </CardContent>
        <CardActions>
          <Button
            size='small'
            onClick={(e: any) => {
              e.stopPropagation();
              handleMoreInfoClick();
            }}
          >
            Деталі
          </Button>
          <Button
            size='small'
            onClick={(e: any) => {
              e.stopPropagation();
              handleDeleteClick();
            }}
            color='error'
          >
            Видалити
          </Button>
        </CardActions>
      </Card>

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
