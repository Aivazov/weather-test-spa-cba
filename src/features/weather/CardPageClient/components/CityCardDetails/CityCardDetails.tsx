import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
import { useParams } from 'next/navigation';
import { useSelector } from 'react-redux';
import {
  cardMediaStyles,
  boxMainStyles,
  boxCommonStyles,
  cardTitleStyles,
  cardTempStyles,
  cardDetailsContainer,
  cardBackgroundEffect,
} from './cityCardDetailsStyles';
import ScaleExpand from '@/shared/framerAnimation/ScaleExpand';
import { commonOptions } from './cityCardDetailsAssets';
import AppearingOut from '@/shared/framerAnimation/AppearingOut';

import ThermostatIcon from '@mui/icons-material/Thermostat';
import CoordinatesSection from './CoordinatesSection';
import MainOptionItem from './MainOptionItem';
import { WeatherIcon } from '@/shared/ui/WeatherIcon/WeatherIcon';

type Props = {};

const CardBgEffect = (props: Props) => {
  return <div style={{ ...cardBackgroundEffect }}></div>;
};

const CityCardDetails = (props: Props) => {
  const params = useParams();
  const cardId = params?.id as string;

  const { cards } = useSelector((state: any) => state.weather);
  const card = cards.find((item: any) => item.id === cardId);

  if(!card) return null;

  return (
    <Card sx={cardDetailsContainer}>
      <CardBgEffect />
      <AppearingOut retention={0.2}>
        <Box
          sx={{
            ...cardMediaStyles, // сохраняем размеры и внешние отступы оригинального медиа-блока
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '120px', // даем немного пространства для иконки, если в стилях не указано
          }}
        >
          {/* Передаем код иконки из стейта. 
              Поскольку страница деталей в темной теме, ставим lightMode={false} */}
          <WeatherIcon iconCode={card.icon || '01d'} lightMode={false} />
        </Box>
        {/* <CardMedia
          sx={cardMediaStyles}
          image={
            card.icon
              ? `https://openweathermap.org/img/wn/${card.icon}@2x.png`
              : ''
          }
          title='weather icon'
        /> */}
      </AppearingOut>
      
      <CardContent sx={{ p: 4 }}>
        <AppearingOut retention={0.35}>
          <Typography
            gutterBottom
            variant='h3'
            component='div'
            align='center'
            sx={cardTitleStyles}
          >
            {card.city}
            {card.state && `, ${card.state}`}
            {card.country && `, ${card.country}`}
          </Typography>
        </AppearingOut>

        {(card.lat || card.lon) && (
          <AppearingOut retention={0.5}>
            <CoordinatesSection card={card} />
          </AppearingOut>
        )}

        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
          <AppearingOut retention={0.65}>
            <Typography variant='h3' component='div' sx={cardTempStyles}>

            <ThermostatIcon color="secondary" />
              {card.temperature ? Math.round(card.temperature) : '--'}°C
            </Typography>
          </AppearingOut>
        </Box>

        {/* Main Options List */}
        <Box sx={boxMainStyles}>
          {commonOptions(card).map((item, idx) => {
            return (
              <ScaleExpand key={item.title} retention={idx + 6}>
                <MainOptionItem item={item}/>
              </ScaleExpand>
            );
          })}
        </Box>

        <ScaleExpand retention={11}>
          <Box sx={{ ...boxCommonStyles, p: 3, ...cardTitleStyles }}>
            <Typography 
              variant='h6' 
              color='text.secondary' 
              gutterBottom
            >
              Погодні умови
            </Typography>
            <Typography variant='h4' sx={{ textTransform: 'capitalize' }}>
              {card.description ? card.description : 'Невідомо'}
            </Typography>
          </Box>
        </ScaleExpand>
      </CardContent>
    </Card>
  );
};

export default CityCardDetails;
