import { Button, SvgIconTypeMap } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

type Props = {
  children: string;
  option: 'text' | 'outlined' | 'contained';
  onClickHandler: () => void;
  loading?: boolean;
  loadingIndicator?: React.JSX.Element;
  startIcon?: SvgIconTypeMap;
};

const ButtonMain = ({
  children,
  onClickHandler,
  option,
  loading = false,
  loadingIndicator,
}: Props) => {
  return (
    <Button
      variant={option}
      // variant='outlined'
      startIcon={<ArrowBackIcon />}
      loading={loading}
      loadingIndicator={loadingIndicator}
      onClick={onClickHandler}
      sx={{ mb: 3, position: 'relative', zIndex: 10 }}
    >
      {children}
    </Button>
  );
};

export default ButtonMain;
