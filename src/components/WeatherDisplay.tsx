import { Box, Grid } from '@mui/material';
import React from 'react'
import { useSelector } from 'react-redux';
import CityCard from './CityCard';

type Props = {}

const WeatherDisplay = (props: Props) => {
  const { temperature, humidity, city, description, icon, country } = useSelector((state: any) => state.weather);
  // console.log('temperature', temperature);
  // console.log('humidity', humidity);
  // console.log('city', city);
  // console.log('description', description);
  // console.log('icon', icon);
  // console.log('country', country);

  if (!city) {
    return (
      <div className="text-center text-gray-500 dark:text-gray-400">
        <p className="text-lg">Введите название города в поле поиска выше</p>
      </div>
    );
  }

  return (
    <Box>
      <Grid container spacing={2}>
        {/* <CityCard /> */}
        {/* <CityCard />
        <CityCard />
        <CityCard />
        <CityCard />
        <CityCard />
        <CityCard />
        <CityCard /> */}
      </Grid>
    </Box>
  );
}

export default WeatherDisplay