'use client';

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setCities,
  setLoadingCities,
  clearCities,
  addWeatherCard,
} from '@/features/weather/weatherSlice';
import { TextField } from '@mui/material';
import { useGetCurrentWeatherQuery } from '@/lib/fetchWeatherData';
import styles from './SearchBar.module.scss';
import { textFieldStyles } from './SearchBarStyles';

interface City {
  name: string;
  local_names?: Record<string, string>;
  lat: number;
  lon: number;
  country: string;
  state?: string;
}

type Props = {};

const SearchBar = (props: Props) => {
  const [inputValue, setInputValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [currentWeatherQuery, setCurrentWeatherQuery] = useState<{
    city?: string;
    lat?: number;
    lon?: number;
  } | null>(null);

  const dispatch = useDispatch();
  const { cities, isLoadingCities } = useSelector(
    (state: any) => state.weather
  );

  const {
    data: weatherData,
    isLoading: isLoadingWeather,
    error: weatherError,
  } = useGetCurrentWeatherQuery(
    currentWeatherQuery,
    { skip: !currentWeatherQuery } // no query if currentWeatherQuery is empty
  );

  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (weatherData && !isLoadingWeather && !weatherError) {
      dispatch(
        addWeatherCard({
          temperature: weatherData.main.temp,
          humidity: weatherData.main.humidity,
          feelsLike: weatherData.main.feels_like,
          tempMin: weatherData.main.temp_min,
          tempMax: weatherData.main.temp_max,
          pressure: weatherData.main.pressure,
          windSpeed: weatherData.wind.speed,
          windDeg: weatherData.wind.deg,
          // id: weatherData.weather[0].id,
          description: weatherData.weather[0].description,
          condition: weatherData.weather[0].main,
          icon: weatherData.weather[0].icon,
          city: weatherData.name,
          country: weatherData.sys.country,
          lat: weatherData.coord.lat,
          lon: weatherData.coord.lon,
          state: undefined,
        })
      );
      // console.log('weatherData Searchbar', weatherData);

      setCurrentWeatherQuery(null);
    }
  }, [weatherData, isLoadingWeather, weatherError, dispatch]);

  const searchCities = useCallback(
    async (query: string) => {
      if (query.length < 2) {
        dispatch(clearCities());
        return;
      }

      dispatch(setLoadingCities(true));
      try {
        const response = await fetch(
          `/api/searchCities?query=${encodeURIComponent(query)}`
        );
        const data = await response.json();
        dispatch(setCities(data));
        setShowSuggestions(true);
      } catch (error) {
        console.error('Error searching cities:', error);
        dispatch(clearCities());
      } finally {
        dispatch(setLoadingCities(false));
      }
    },
    [dispatch]
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    searchCities(value);
  };

  const handleCitySelect = (city: City) => {
    setInputValue(city.name);
    setShowSuggestions(false);
    setCurrentWeatherQuery({ lat: city.lat, lon: city.lon });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setCurrentWeatherQuery({ city: inputValue.trim() });
      setShowSuggestions(false);
    }
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (
      suggestionsRef.current &&
      !suggestionsRef.current.contains(e.target as Node) &&
      inputRef.current &&
      !inputRef.current.contains(e.target as Node)
    ) {
      setShowSuggestions(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <form onSubmit={handleSubmit} className={styles.searchBarContainer}>
      <TextField
        id='filled-basic'
        label='Введіть назву міста...'
        variant='filled'
        ref={inputRef}
        value={inputValue}
        onChange={handleInputChange}
        onFocus={() =>
          inputValue && cities.length > 0 && setShowSuggestions(true)
        }
        sx={textFieldStyles}
      />

      {showSuggestions && (cities.length > 0 || isLoadingCities) && (
        <div ref={suggestionsRef} className={styles.suggestions}>
          {isLoadingCities ? (
            <div className={styles.loadingText}>Пошук...</div>
          ) : (
            cities.map((city: City, index: number) => (
              <div
                key={index}
                onClick={() => handleCitySelect(city)}
                className={styles.suggestionItem}
              >
                {city.state
                  ? `${city.name}, ${city.state}, ${city.country}`
                  : `${city.name}, ${city.country}`}
              </div>
            ))
          )}
        </div>
      )}
    </form>
  );
};

export default SearchBar;
