import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
import { useParams } from 'next/navigation';
import { useSelector } from 'react-redux';
import {
  cardMediaStyles,
  boxMainStyles,
  boxCommonStyles,
  fontSizeSubtitle,
  fontSizeData,
  cardTitleStyles,
  cardTempStyles,
  cardDetailsContainer,
} from './cityCardDetailsStyles';
import ScaleExpand from '@/shared/framerAnimation/ScaleExpand';
import { commonOptions } from './cityCardDetailsAssets';

type Props = {};

const CityCardDetails = (props: Props) => {
  const params = useParams();
  const cardId = params?.id as string;

  const { cards } = useSelector((state: any) => state.weather);
  const card = cards.find((item: any) => item.id === cardId);

  return (
    <Card sx={cardDetailsContainer}>
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
          sx={cardTitleStyles}
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
          <Typography variant='h3' component='div' sx={cardTempStyles}>
            {card.temperature ? Math.round(card.temperature) : '--'}°C
          </Typography>
        </Box>

        {/* Main Options List */}
        <Box sx={boxMainStyles}>
          {commonOptions(card).map((item, idx) => (
            <ScaleExpand key={idx} idx={idx}>
              <Box sx={boxCommonStyles}>
                <Typography color='text.secondary' sx={fontSizeSubtitle}>
                  {item.title}
                </Typography>
                <Typography sx={fontSizeData}>{item.text}</Typography>
              </Box>
            </ScaleExpand>
          ))}
        </Box>

        <ScaleExpand idx={5}>
          <Box sx={{ ...boxCommonStyles, p: 3, ...cardTitleStyles }}>
            <Typography variant='h6' color='text.secondary' gutterBottom>
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
