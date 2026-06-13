import { Box, Typography } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';

type CoordinatesSectionProps = {
  card: {
    lon?: number | null;
    lat?: number | null;
  };
}

const CoordinatesSection = ({card}: CoordinatesSectionProps) => {
  return (
    <Box
      sx={{
        mb: 2,
        display: 'flex',
        flexDirection: 'column',
        '@media (min-width:420px)': {
          flexDirection: 'row',
          gap: '8px',
        },
        justifyContent: 'center',
        alignItems: 'center',
        gap: '4px',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
        <LocationOnIcon fontSize="small" color="primary" />
        <Typography variant='subtitle1' color='text.secondary'>
          Координати:
        </Typography>
      </Box>

      <Box 
        sx={{ 
          display: 'flex', 
          gap: 1,
          fontSize: { xs: '0.85rem', sm: '1rem' },
          whiteSpace: 'nowrap'
        }}
      >
        <Typography variant='subtitle1' color='text.secondary' sx={{ fontSize: 'inherit' }}>
          {card.lat?.toFixed(4)},
        </Typography>
        <Typography variant='subtitle1' color='text.secondary' sx={{ fontSize: 'inherit' }}>
          {card.lon?.toFixed(4)}
        </Typography>
      </Box>
    </Box>
  )
}

export default CoordinatesSection