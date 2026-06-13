// src/features/weather/components/WeatherClient/CityCardsList/EmptyCardsState.tsx
import { Box, Typography } from '@mui/material';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';

const EmptyCardsState = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        maxWidth: '400px',
        margin: '40px auto',
        padding: '40px 20px',
        borderRadius: '16px',
        border: '2px dashed rgba(255, 255, 255, 0.2)',
        backgroundColor: 'rgba(255, 255, 255, 0.03)',
        textAlign: 'center',
        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.2)',
        backdropFilter: 'blur(4px)',
        transition: 'all 0.3s ease',
        '&:hover': {
          borderColor: 'primary.main',
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
        }
      }}
    >
      <AddLocationAltIcon 
        sx={{ 
          fontSize: 80, 
          color: 'text.secondary',
          opacity: 0.6,
          mb: 2,
          animation: 'bounce 2s infinite ease-in-out',
          '@keyframes bounce': {
            '0%, 100%': { transform: 'translateY(0)' },
            '50%': { transform: 'translateY(-8px)' },
          }
        }} 
      />
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
        Ваш список міст порожній
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ maxWidth: '280px', mb: 1 }}>
        Знайдіть та додайте своє перше місто у пошуку вище, щоб відстежувати погоду в реальному часі.
      </Typography>
    </Box>
  );
};

export default EmptyCardsState;