//src/pages/api/fetchData.ts

import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

interface WeatherData {
  coord: {
    lat: number;
    lon: number;
  };
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  weather: [
    {
      main: string;
      description: string;
      icon: string;
    }
  ];
  sys: {
    country: string;
  };
  name: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { city, lat, lon } = req.query;
  console.log('fetchData API called with:', { city, lat, lon });

  // Check if either city name or coordinates are provided
  const hasCity = city && typeof city === 'string' && city.trim().length > 0;
  const hasCoords = lat && lon && !isNaN(Number(lat)) && !isNaN(Number(lon));
  console.log('hasCity:', hasCity, 'hasCoords:', hasCoords);

  if (!hasCity && !hasCoords) {
    return res.status(400).json({
      error: 'Either city name or coordinates (lat, lon) are required',
    });
  }

  if (!WEATHER_API_KEY) {
    return res
      .status(500)
      .json({ error: 'API_KEY is missing in the environment variables' });
  }

  try {
    const params: any = {
      appid: WEATHER_API_KEY,
      units: 'metric',
    };

    // Use coordinates if provided, otherwise use city name
    if (hasCoords) {
      params.lat = Number(lat);
      params.lon = Number(lon);
    } else {
      params.q = city;
    }

    const response = await axios.get<WeatherData>(BASE_URL, {
      params,
    });

    const data = response.data;
    console.log('data', data);

    // Return enhanced data with coordinates (ensure lat/lon are always present)
    return res.status(200).json({
      ...data,
      lat: data.coord?.lat || Number(lat) || 0,
      lon: data.coord?.lon || Number(lon) || 0,
    });

    // return res.status(200).json({
    //   city: data.name,
    //   temperature: data.main.temp,
    //   humidity: data.main.humidity,
    //   description: data.weather[0].description,
    //   icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`,
    // });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to fetch weather data' });
  }
}
