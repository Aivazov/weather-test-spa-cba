// src/shared/ui/WeatherIcon/WeatherIcon.tsx

import {
  WbSunny,
  Cloud,
  BeachAccess,
  Thunderstorm,
  AcUnit,
} from '@mui/icons-material';

interface WeatherIconProps {
  iconCode: string;
  lightMode: boolean;
}

export const WeatherIcon = ({ iconCode, lightMode }: WeatherIconProps) => {
  switch (iconCode.slice(0, 2)) {
    case '01':
      return (
        <WbSunny
          sx={{
            fontSize: 70,
            color: '#ffb300',
            animation: 'spin 12s linear infinite',
            '@keyframes spin': {
              '0%': { transform: 'rotate(0deg)' },
              '100%': { transform: 'rotate(360deg)' },
            },
          }}
        />
      );
    case '02':
    case '03':
    case '04':
      return (
        <Cloud
          sx={{
            fontSize: 70,
            color: lightMode ? '#90a4ae' : '#cfd8dc',
            animation: 'float 3s ease-in-out infinite',
            '@keyframes float': {
              '0%, 100%': { transform: 'translateY(0)' },
              '50%': { transform: 'translateY(-4px)' },
            },
          }}
        />
      );
    case '09':
    case '10':
      return <BeachAccess sx={{ fontSize: 70, color: '#29b6f6' }} />;
    case '11':
      return <Thunderstorm sx={{ fontSize: 70, color: '#5e35b1' }} />;
    case '13':
      return (
        <AcUnit
          sx={{
            fontSize: 70,
            color: '#4dd0e1',
            animation: 'pulse 2s ease-in-out infinite',
            '@keyframes pulse': {
              '0%, 100%': { transform: 'scale(1)' },
              '50%': { transform: 'scale(1.08)' },
            },
          }}
        />
      );
    default:
      return (
        <WbSunny
          sx={{
            fontSize: 70,
            color: '#ffb300',
            animation: 'spin 10s linear infinite',
            '@keyframes spin': {
              '0%': { transform: 'rotate(0deg)' },
              '100%': { transform: 'rotate(360deg)' },
            },
          }}
        />
      );
  }
};
