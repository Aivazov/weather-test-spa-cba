import ButtonMain from '@/shared/ui/ButtonMain';
import { Box, Typography } from '@mui/material';

type Props = {
  onReturnHome: () => void;
};

const NotFound = ({ onReturnHome }: Props) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        p: 3,
      }}
    >
      <Typography variant='h4' gutterBottom>
        Картка не знайдена
      </Typography>
      <ButtonMain onClickHandler={onReturnHome} option='contained'>
        Повернутися на головну
      </ButtonMain>
    </Box>
  );
};

export default NotFound;
