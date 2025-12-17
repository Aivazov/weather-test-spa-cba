import { createAsyncThunk } from '@reduxjs/toolkit';

// refreshing request for all the cards
export const refreshWeatherCards = createAsyncThunk(
  'weather/refreshWeatherCards',
  async (cards) => {
    console.log(
      'refreshWeatherCards thunk: Starting with',
      cards.length,
      'cards'
    );

    const updatedCards = await Promise.all(
      cards.map(async (card, index) => {
        try {
          console.log(
            `refreshWeatherCards thunk: Updating card ${index + 1}/${
              cards.length
            }: ${card.city}`
          );

          // Делаем прямой API запрос для получения актуальных данных
          const response = await fetch(
            `/api/fetchData?lat=${card.lat}&lon=${card.lon}&forecast=false`
          );

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const result = await response.json();
          console.log(
            `refreshWeatherCards thunk: Successfully updated ${card.city}`
          );

          return {
            ...card,
            temperature: result.main.temp,
            humidity: result.main.humidity,
            feelsLike: result.main.feels_like,
            tempMin: result.main.temp_min,
            tempMax: result.main.temp_max,
            pressure: result.main.pressure,
            windSpeed: result.wind.speed,
            windDeg: result.wind.deg,
            description: result.weather[0].description,
            condition: result.weather[0].main,
            icon: result.weather[0].icon,
            country: result.sys.country,
            city: result.name,
          };
        } catch (error) {
          console.error(
            `refreshWeatherCards thunk: Error updating ${card.city}:`,
            error
          );
          return card;
        }
      })
    );

    console.log(
      'refreshWeatherCards thunk: Completed, returning',
      updatedCards.length,
      'updated cards'
    );
    return updatedCards;
  }
);

// for backward compatibility
export const loadWeatherData = refreshWeatherCards;
