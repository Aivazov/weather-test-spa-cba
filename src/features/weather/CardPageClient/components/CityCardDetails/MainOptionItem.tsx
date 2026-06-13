import { Box, Tooltip, Typography } from '@mui/material';
import {
  boxCommonStyles,
  fontSizeSubtitle,
  fontSizeData,
} from './cityCardDetailsStyles';

type MuiIconComponent = React.ComponentType<{ sx?: any; fontSize?: any; color?: any }>;

type MainOptionItemProps = {
  item: {
    title: string;
    text: string | number | null;
    icon?: MuiIconComponent; 
  };
};

const MainOptionItem = ({ item }: MainOptionItemProps) => {
  const IconComponent = item.icon;

  return (
      <Tooltip 
        title={`${item.title}: ${item.text ?? '--'}`} 
        arrow 
        placement="top"
        enterTouchDelay={0} 
      >
        <Box 
          sx={{ 
            ...boxCommonStyles, 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            cursor: 'pointer', 
            p: 1.5
          }}
        >
          {IconComponent && (
            <IconComponent sx={{ color: 'primary.main', mb: 1, fontSize: '1.8rem' }} />
          )}

          <Typography 
            color='text.secondary' 
            sx={{ 
              ...fontSizeSubtitle,
              '@media (max-width:390px)': {
                display: 'none'
              }
            }} 
            align="center"
          >
            {item.title}
          </Typography>

          <Typography sx={fontSizeData} align="center">
            {item.text ?? '--'}
          </Typography>
        </Box>
      </Tooltip>
  );
};

export default MainOptionItem;