'use client';

import {
  Box,
  Card,
  CardActions,
  CardContent,
  createTheme,
  ThemeProvider,
  Typography,
} from '@mui/material';
import Modal from '@/shared/ui/Modal';
import ButtonCard from '@/shared/ui/ButtonCard';
import { card, cardMedia } from './cityCardStyles';
import FadeInFromBottom from '@/shared/framerAnimation/FadeInFromBottom';
import AppearingOut from '@/shared/framerAnimation/AppearingOut';
import { useCityCard } from '../hooks/useCityCard';
import { WeatherIcon } from '@/shared/ui/WeatherIcon/WeatherIcon';

export interface WeatherCardProps {
  idx: number;
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

const darkTheme = createTheme({ palette: { mode: 'dark' } });
const lightTheme = createTheme({ palette: { mode: 'light' } });

const CityCard = (props: WeatherCardProps) => {
  const { city, country, lightMode, idx } = props;

  const {
    deleteDialogOpen,
    safeIcon,
    safeTemp,
    safeHumidity,
    safeCondition,
    handleDeleteClick,
    handleDeleteCancel,
    handleDeleteConfirm,
    handleMoreInfoClick,
  } = useCityCard(props);

  return (
    <ThemeProvider theme={lightMode ? lightTheme : darkTheme}>
      <FadeInFromBottom idx={idx}>
        <Card sx={card}>
          {/* Weather Icon Block */}
          <AppearingOut retention={0.3}>
            <Box
              sx={{
                ...cardMedia,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <WeatherIcon iconCode={safeIcon} lightMode={lightMode} />
            </Box>
          </AppearingOut>

          {/* Info Block */}
          <CardContent sx={{ flexGrow: 1 }}>
            {city && country && (
              <AppearingOut retention={0.4}>
                <Typography gutterBottom variant='h5' component='div'>
                  {city}, {country}
                </Typography>
              </AppearingOut>
            )}

            <AppearingOut retention={0.5}>
              <Typography variant='body2' sx={{ color: 'text.secondary' }}>
                Температура: {safeTemp}°C
              </Typography>
            </AppearingOut>

            <AppearingOut retention={0.6}>
              <Typography variant='body2' sx={{ color: 'text.secondary' }}>
                Вологість: {safeHumidity}%
              </Typography>
            </AppearingOut>

            <AppearingOut retention={0.7}>
              <Typography variant='body2' sx={{ color: 'text.secondary' }}>
                Умови: {safeCondition}
              </Typography>
            </AppearingOut>
          </CardContent>

          {/* Control Btns */}
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

      {/* Confirmation Modal */}
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
