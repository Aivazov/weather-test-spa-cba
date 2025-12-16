import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('/api/fetchData', ({ request }) => {
    const url = new URL(request.url);
    const city = url.searchParams.get('city');
    const lat = url.searchParams.get('lat');
    const lon = url.searchParams.get('lon');
    const forecast = url.searchParams.get('forecast');

    if (city) {
      return HttpResponse.json({
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
      });
    }

    if (lat && lon) {
      return HttpResponse.json({
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
      });
    }

    if (forecast === 'true') {
      return HttpResponse.json({
        list: [
          {
            dt: 1609459200, // 1 января 2021 года
            main: { temp: 22, feels_like: 21 },
            weather: [{ main: 'Clear', description: 'clear sky', icon: '01d' }],
            dt_txt: '2021-01-01 12:00:00',
          },
        ],
      });
    }

    return HttpResponse.json({ error: 'Invalid request' }, { status: 400 });
  }),
];
