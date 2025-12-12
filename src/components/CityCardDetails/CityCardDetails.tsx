import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
import { useParams } from 'next/navigation';
import { useSelector } from 'react-redux';
import {
  cardMediaStyles,
  boxMainStyles,
  boxCommonStyles,
  fontSizeSubtitle,
  fontSizeData,
} from './cityCardDetailsStyles';

type Props = {};

const CityCardDetails = (props: Props) => {
  const params = useParams();

  const cardId = params?.id as string;
  const { cards } = useSelector((state: any) => state.weather);
  const card = cards.find((item: any) => item.id === cardId);
  // console.log('card', card);

  return (
    <Card sx={{ maxWidth: 600, width: '100%' }}>
      <CardMedia
        sx={cardMediaStyles}
        image={
          card.icon
            ? `https://openweathermap.org/img/wn/${card.icon}@2x.png`
            : ''
        }
        title='weather icon'
      />
      <CardContent sx={{ p: 4 }}>
        <Typography
          gutterBottom
          variant='h3'
          component='div'
          align='center'
          sx={{ mb: 3 }}
        >
          {card.city}
          {card.state && `, ${card.state}`}
          {card.country && `, ${card.country}`}
        </Typography>

        {(card.lat || card.lon) && (
          <Typography
            variant='subtitle1'
            align='center'
            sx={{ mb: 2, color: 'text.secondary' }}
          >
            Координати: {card.lat?.toFixed(4)}, {card.lon?.toFixed(4)}
          </Typography>
        )}

        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
          <Typography variant='h3' component='div' sx={{ fontWeight: 'light' }}>
            {card.temperature ? Math.round(card.temperature) : '--'}°C
          </Typography>
        </Box>

        <Box sx={boxMainStyles}>
          <Box sx={boxCommonStyles}>
            <Typography color='text.secondary' sx={fontSizeSubtitle}>
              Відчувається як
            </Typography>
            <Typography sx={fontSizeData}>
              {card.feelsLike ? Math.round(card.feelsLike) : '--'}°C
            </Typography>
          </Box>

          <Box sx={boxCommonStyles}>
            <Typography color='text.secondary' sx={fontSizeSubtitle}>
              Вологість
            </Typography>
            <Typography sx={fontSizeData}>
              {card.humidity ? `${card.humidity}%` : '--'}
            </Typography>
          </Box>
          <Box sx={boxCommonStyles}>
            <Typography color='text.secondary' sx={fontSizeSubtitle}>
              Тиск, мм
            </Typography>
            <Typography sx={fontSizeData}>
              {card.pressure ? `${card.pressure}` : '--'}
            </Typography>
          </Box>

          <Box sx={boxCommonStyles}>
            <Typography color='text.secondary' sx={fontSizeSubtitle}>
              Вітер, км/г
            </Typography>
            <Typography sx={fontSizeData}>
              {card.windSpeed
                ? `${Math.floor(card.windSpeed * 3.6 * 10) / 10}`
                : '--'}
              {/* , {card.windDeg ? `${card.windDeg}` : '--'} */}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ ...boxCommonStyles, p: 3 }}>
          <Typography variant='h6' color='text.secondary' gutterBottom>
            Погодні умови
          </Typography>
          <Typography variant='h4' sx={{ textTransform: 'capitalize' }}>
            {card.description || 'Неизвестно'}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CityCardDetails;
