import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const GEO_URL = 'http://api.openweathermap.org/geo/1.0/direct';

interface CityResult {
  name: string;
  local_names?: Record<string, string>;
  lat: number;
  lon: number;
  country: string;
  state?: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { query } = req.query;

  if (!query || typeof query !== 'string') {
    return res.status(400).json({ error: 'Query is required and must be a string' });
  }

  if (!WEATHER_API_KEY) {
    return res.status(500).json({ error: 'API_KEY is missing in the environment variables' });
  }

  try {
    const response = await axios.get<CityResult[]>(GEO_URL, {
      params: {
        q: query,
        limit: 5, // Ограничиваем до 5 результатов
        appid: WEATHER_API_KEY,
      },
    });

    const cities = response.data.map(city => ({
      name: city.name,
      country: city.country,
      state: city.state,
      fullName: city.state ? `${city.name}, ${city.state}, ${city.country}` : `${city.name}, ${city.country}`,
    }));

    return res.status(200).json(cities);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to search cities' });
  }
}
