import { Button } from '@mui/material';

type Props = {
  handler: () => void;
  color:
    | 'inherit'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'error'
    | 'info'
    | 'warning';
  children: string;
};

const ButtonCard = ({ children, handler, color }: Props) => {
  return (
    <Button
      size='small'
      onClick={(e: any) => {
        e.stopPropagation();
        handler();
      }}
      color={color}
    >
      {children}
    </Button>
  );
};

export default ButtonCard;
