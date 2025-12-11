'use client';

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCities, setLoadingCities, clearCities, addWeatherCard } from '@/redux/weatherSlice';
import { TextField } from '@mui/material';

interface City {
  name: string;
  local_names?: Record<string, string>;
  lat: number;
  lon: number;
  country: string;
  state?: string;
}

type Props = {}
const textFieldStyles = {
  width: '100%',
  '& .MuiFormLabel-root': {
    padding: '4px 6px',
    color: '#92a4d1',
    '&.Mui-focused': {
      color: '#7b89ab',
    },
  },
  '& .MuiFilledInput-root': {
    backgroundColor: '#4c4d4f',
    '&:hover': {
      backgroundColor: '#4c4d4f',
    },
    '&.Mui-focused': {
      backgroundColor: '#4c4d4f',
    }
  },
  '& .MuiFilledInput-input': {
    height: '30px',
    paddingLeft: '16px',
    color: '#caced9',
    fontSize: '16px',
    '&::placeholder': {
      color: '#92a4d1',
      opacity: 0.7,
    },
  },
  '& .MuiFilledInput-underline:before': {
    borderBottomColor: 'grey.300',
  },
  '& .MuiFilledInput-underline:after': {
    borderBottomColor: '#7b89ab',
  },
  '&:hover .MuiFilledInput-underline:before': {
    borderBottomColor: 'grey.400',
  },
}

const SearchBar = (props: Props) => {
  const [inputValue, setInputValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const dispatch = useDispatch();
  const { cities, isLoadingCities } = useSelector((state: any) => state.weather);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  const searchCities = useCallback(async (query: string) => {
    if (query.length < 2) {
      dispatch(clearCities());
      return;
    }

    dispatch(setLoadingCities(true));
    try {
      const response = await fetch(`/api/searchCities?query=${encodeURIComponent(query)}`);
      const data = await response.json();
      dispatch(setCities(data));
      setShowSuggestions(true);
    } catch (error) {
      console.error('Error searching cities:', error);
      dispatch(clearCities());
    } finally {
      dispatch(setLoadingCities(false));
    }
  }, [dispatch]);

  const fetchWeather = useCallback(async (cityName: string) => {
    try {
      const response = await fetch(`/api/fetchData?city=${encodeURIComponent(cityName)}`);
      const data = await response.json();
      if (!data.error) {
        dispatch(addWeatherCard({
          temperature: data.main.temp,
          humidity: data.main.humidity,
          description: data.weather[0].description,
          icon: data.weather[0].icon,
          city: data.name,
          country: data.sys.country,
        }));
      }
    } catch (error) {
      console.error('Error fetching weather:', error);
    }
  }, [dispatch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    searchCities(value);
  };

  const handleCitySelect = (city: City) => {
    setInputValue(city.name);
    setShowSuggestions(false);
    fetchWeather(city.name);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      fetchWeather(inputValue);
      setShowSuggestions(false);
    }
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (suggestionsRef.current && !suggestionsRef.current.contains(e.target as Node) &&
        inputRef.current && !inputRef.current.contains(e.target as Node)) {
      setShowSuggestions(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <form onSubmit={handleSubmit} className="relative">
      <TextField
        id="filled-basic"
        label="Введите название города..."
        variant="filled"
        ref={inputRef}
        value={inputValue}
        onChange={handleInputChange}
        onFocus={() => inputValue && cities.length > 0 && setShowSuggestions(true)}
        sx={textFieldStyles}
      />

      {showSuggestions && (cities.length > 0 || isLoadingCities) && (
        <div
          ref={suggestionsRef}
          className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto dark:bg-gray-800 dark:border-gray-600"
        >
          {isLoadingCities ? (
            <div className="px-4 py-2 text-gray-500 dark:text-gray-400">
              Поиск...
            </div>
          ) : (
            cities.map((city: City, index: number) => (
              <div
                key={index}
                onClick={() => handleCitySelect(city)}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer dark:hover:bg-gray-700 dark:text-white"
              >
                {city.state ? `${city.name}, ${city.state}, ${city.country}` : `${city.name}, ${city.country}`}
              </div>
            ))
          )}
        </div>
      )}
    </form>
  );
};

export default SearchBar;