// src/tests/mocks/handlers.ts
import { rest } from 'msw';

export const handlers = [
  // Мокаем запрос на получение текущей погоды по городу
  rest.get('/api/fetchData', (req, res, ctx) => {
    const city = req.url.searchParams.get('city');
    const lat = req.url.searchParams.get('lat');
    const lon = req.url.searchParams.get('lon');
    const forecast = req.url.searchParams.get('forecast');

    // Простой ответ на запрос текущей погоды
    if (city) {
      return res(
        ctx.status(200),
        ctx.json({
          coord: { lat: 50, lon: 30 },
          main: {
            temp: 23,
            feels_like: 22,
            temp_min: 21,
            temp_max: 25,
            pressure: 1013,
            humidity: 60,
          },
          weather: [{ main: 'Clear', description: 'clear sky', icon: '01d' }],
          name: 'Kyiv',
        })
      );
    }

    // Простой ответ на запрос с координатами
    if (lat && lon) {
      return res(
        ctx.status(200),
        ctx.json({
          coord: { lat: 50, lon: 30 },
          main: {
            temp: 23,
            feels_like: 22,
            temp_min: 21,
            temp_max: 25,
            pressure: 1013,
            humidity: 60,
          },
          weather: [{ main: 'Clear', description: 'clear sky', icon: '01d' }],
          name: 'Kyiv',
        })
      );
    }

    // Мокаем запрос с параметром forecast
    if (forecast === 'true') {
      return res(
        ctx.status(200),
        ctx.json({
          list: [
            {
              dt: 1609459200, // 1 января 2021 года
              main: { temp: 22, feels_like: 21 },
              weather: [
                { main: 'Clear', description: 'clear sky', icon: '01d' },
              ],
              dt_txt: '2021-01-01 12:00:00',
            },
          ],
        })
      );
    }

    return res(ctx.status(400), ctx.json({ error: 'Invalid request' }));
  }),
];
