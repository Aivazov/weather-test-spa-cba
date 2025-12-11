//src/pages/api/fetchData.ts

import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

interface WeatherData {
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
  ],
  sys: {
    country: string;
  },
  name: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { city } = req.query;

  if (!city || typeof city !== 'string') {
    return res.status(400).json({ error: 'City is required and must be a string' });
  }

  if (!WEATHER_API_KEY) {
    return res.status(500).json({ error: 'API_KEY is missing in the environment variables' });
  }

  try {
    const response = await axios.get<WeatherData>(BASE_URL, {
      params: {
        q: city,
        appid: WEATHER_API_KEY,
        units: 'metric',
      },
    });

    const data = response.data;
    console.log('data', data);
    

    return res.status(200).json(data);

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