import BgAnimation from '@/shared/ui/BgAnimation/BgAnimation';
import {
  themeDeepNight,
  themeMysticForest,
} from '@/shared/ui/BgAnimation/BgAnimationAssets';
import ButtonMain from '@/shared/ui/ButtonMain';
import { Box, Typography } from '@mui/material';

type Props = {
  onReturnHome: () => void;
};

const NotFoundCard = ({ onReturnHome }: Props) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        p: 3,
        position: 'relative',
        zIndex: 10,
      }}
    >
      <BgAnimation colors={themeMysticForest} />
      <Typography
        variant='h4'
        gutterBottom
        sx={{
          position: 'relative',
          zIndex: 10,
        }}
      >
        Картка не знайдена
      </Typography>
      <ButtonMain onClickHandler={onReturnHome} option='contained'>
        Повернутися на головну
      </ButtonMain>
    </Box>
  );
};

export default NotFoundCard;
