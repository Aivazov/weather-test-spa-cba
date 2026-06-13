'use client';

import {
  Box,
  Card,
  CardActions,
  CardContent,
  createTheme,
  IconButton,
  ThemeProvider,
  Typography,
} from '@mui/material';
import Modal from '@/shared/ui/Modal';
import ButtonCard from '@/shared/ui/ButtonCard';
import { card, cardContentStyles, cardMedia } from './cityCardStyles';
import FadeInFromBottom from '@/shared/framerAnimation/FadeInFromBottom';
import AppearingOut from '@/shared/framerAnimation/AppearingOut';
import { useCityCard } from '../../hooks/useCityCard';
import { WeatherIcon } from '@/shared/ui/WeatherIcon/WeatherIcon';

import WaterDropIcon from '@mui/icons-material/WaterDrop';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

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

const CityCard = (props: WeatherCardProps) => {
  const { city, country, idx } = props;

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

  const onDeleteWrapper = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleDeleteClick();
  };

  return (
    <FadeInFromBottom idx={idx}>
      <Box>
        <Card 
          sx={card} 
          onClick={handleMoreInfoClick} 
        >
          {/* <IconButton 
            size="small" 
            onClick={onDeleteWrapper}
            sx={{ 
              position: 'absolute', 
              top: 8, 
              right: 8, 
              color: '#ff4d4d', // Яркий красный цвет для темного фона
              opacity: 0.8,
              transition: 'opacity 0.2s, transform 0.2s',
              '&:hover': { opacity: 1, transform: 'scale(1.1)', backgroundColor: 'rgba(255, 77, 77, 0.1)' }
            }}
          >
            <DeleteOutlineIcon fontSize="small" />
          </IconButton> */}

          {/* Шапка карточки: Город и Страна */}
          <CardContent sx={cardContentStyles}>
            {/* Шапка карточки: Центрируем город и страну */}
            {city && (
              <AppearingOut retention={0.4}>
                <Box sx={{ textAlign: 'center', width: '100%' }}>
                  <Typography 
                    variant='h6' 
                    component='div' 
                    noWrap 
                    sx={{ 
                      fontWeight: 700, 
                      lineHeight: 1.2,
                      color: '#ffffff' // Гарантируем белый цвет заголовка
                    }}
                  >
                    {city}
                  </Typography>
                  <Typography 
                    variant='caption' 
                    sx={{ display: 'block', mb: 1.5, color: '#b0bec5', fontWeight: 500 }}
                  >
                    {country || 'UA'}
                  </Typography>
                </Box>
              </AppearingOut>
            )}

            {/* Главный блок: Выравниваем иконку и температуру по центру горизонтали */}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, mb: 2, width: '100%' }}>
              <AppearingOut retention={0.3}>
                <Box sx={cardMedia}>
                  <WeatherIcon iconCode={safeIcon} lightMode={false} />
                </Box>
              </AppearingOut>

              <AppearingOut retention={0.5}>
                <Typography 
                  variant='h3' 
                  component='div' 
                  sx={{ 
                    fontWeight: 800, 
                    letterSpacing: '-1px',
                    // Контрастный градиент от чисто-белого к серебристому
                    background: 'linear-gradient(45deg, #ffffff 60%, #cfd8dc 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  {safeTemp}°
                </Typography>
              </AppearingOut>
            </Box>

            {/* Дополнительные параметры: Центрируем строки */}
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1, mt: 'auto', width: '100%' }}>
              <AppearingOut retention={0.6}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, justifyContent: 'center' }}>
                  <WaterDropIcon sx={{ fontSize: '1rem', color: '#29b6f6' }} />
                  <Typography variant='body2' sx={{ color: '#e0e0e0' }}>
                    Вологість: <strong style={{ color: '#ffffff' }}>{safeHumidity}%</strong>
                  </Typography>
                </Box>
              </AppearingOut>

              <AppearingOut retention={0.7}>
                <Typography 
                  variant='caption' 
                  noWrap
                  sx={{ 
                    textTransform: 'capitalize', 
                    backgroundColor: 'rgba(255, 255, 255, 0.08)', // Чуть ярче подложка
                    color: '#81d4fa', // Контрастный голубой оттенок для условий
                    padding: '4px 10px',
                    borderRadius: '8px',
                    width: 'fit-content',
                    display: 'block',
                    fontWeight: 600
                  }}
                >
                  {safeCondition}
                </Typography>
              </AppearingOut>
            </Box>
          </CardContent>

          <CardActions sx={{ justifyContent: 'space-between', width: '100%', p: 2.5, pt: 0, pb: 1.5 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'primary.main', fontSize: '0.85rem', fontWeight: 600 }}>
              <InfoOutlinedIcon sx={{ fontSize: '1rem' }} />
              Детальніше
            </Box>
            <Box>
              <IconButton 
                size="small" 
                onClick={onDeleteWrapper}
                sx={{ 
                  color: '#ff4d4d', 
                  opacity: 0.8,
                  transition: 'opacity 0.2s, transform 0.2s',
                  '&:hover': { opacity: 1, transform: 'scale(1.1)', backgroundColor: 'rgba(255, 77, 77, 0.1)' }
                }}
              >
                <DeleteOutlineIcon fontSize="small" />
              </IconButton>
            </Box>
          </CardActions>
        </Card>

        {/* Confirmation Modal */}

        <Modal
          open={deleteDialogOpen}
          onCloseModal={handleDeleteCancel}
          onConfirmModal={handleDeleteConfirm}
          title='Підтвердження видалення'
          text={`Ви дійсно бажаєте видалити картку з погодою для міста ${city}?`}
          approveBtn='Видалити'
        />
        {/* <Modal
          open={deleteDialogOpen}
          onCloseModal={handleDeleteCancel}
          onConfirmModal={handleDeleteConfirm}
          title='Підтвердження видалення'
          text={`Ви дійсно бажаєте видалити картку з погодою для міста ${city}?`}
          approveBtn='Видалити'
        /> */}
      </Box>
    </FadeInFromBottom>
  );
};

// const CityCard = (props: WeatherCardProps) => {
//   const { city, country, lightMode, idx } = props;

//   const {
//     deleteDialogOpen,
//     safeIcon,
//     safeTemp,
//     safeHumidity,
//     safeCondition,
//     handleDeleteClick,
//     handleDeleteCancel,
//     handleDeleteConfirm,
//     handleMoreInfoClick,
//   } = useCityCard(props);

//   return (
//     <ThemeProvider theme={lightMode ? lightTheme : darkTheme}>
//       <FadeInFromBottom idx={idx}>
//         <Card sx={card}>
//           {/* Weather Icon Block */}
//           <AppearingOut retention={0.3}>
//             <Box
//               sx={{
//                 ...cardMedia,
//                 display: 'flex',
//                 justifyContent: 'center',
//                 alignItems: 'center',
//               }}
//             >
//               <WeatherIcon iconCode={safeIcon} lightMode={lightMode} />
//             </Box>
//           </AppearingOut>

//           {/* Info Block */}
//           <CardContent sx={{ flexGrow: 1 }}>
//             {city && country && (
//               <AppearingOut retention={0.4}>
//                 <Typography gutterBottom variant='h5' component='div'>
//                   {city}, {country}
//                 </Typography>
//               </AppearingOut>
//             )}

//             <AppearingOut retention={0.5}>
//               <Typography variant='body2' sx={{ color: 'text.secondary' }}>
//                 Температура: {safeTemp}°C
//               </Typography>
//             </AppearingOut>

//             <AppearingOut retention={0.6}>
//               <Typography variant='body2' sx={{ color: 'text.secondary' }}>
//                 Вологість: {safeHumidity}%
//               </Typography>
//             </AppearingOut>

//             <AppearingOut retention={0.7}>
//               <Typography variant='body2' sx={{ color: 'text.secondary' }}>
//                 Умови: {safeCondition}
//               </Typography>
//             </AppearingOut>
//           </CardContent>

//           {/* Control Btns */}
//           <CardActions>
//             <ButtonCard handler={handleMoreInfoClick} color='primary'>
//               Деталі
//             </ButtonCard>
//             <ButtonCard handler={handleDeleteClick} color='error'>
//               Видалити
//             </ButtonCard>
//           </CardActions>
//         </Card>
//       </FadeInFromBottom>

//       {/* Confirmation Modal */}
//       <Modal
//         open={deleteDialogOpen}
//         onCloseModal={handleDeleteCancel}
//         onConfirmModal={handleDeleteConfirm}
//         title='Підтвердження видалення'
//         text={`Ви дійсно бажаєте видалити картку з погодою для міста ${city}?`}
//         approveBtn='Видалити'
//       />
//     </ThemeProvider>
//   );
// };

export default CityCard;
