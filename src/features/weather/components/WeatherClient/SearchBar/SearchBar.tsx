// src/features/weather/components/WeatherClient/SearchBar/SearchBar.tsx

'use client';

import { TextField } from '@mui/material';
import styles from './SearchBar.module.scss';
import { textFieldStyles } from './SearchBarStyles';
import { City, useWeatherSearch } from '../hooks/useWeatherSearch';

const SearchBar = () => {
  const {
    inputValue,
    showSuggestions,
    setShowSuggestions,
    cities,
    isLoadingCities,
    inputRef,
    suggestionsRef,
    handleInputChange,
    handleCitySelect,
    handleSubmit,
  } = useWeatherSearch();

  return (
    <form onSubmit={handleSubmit} className={styles.searchBarContainer}>
      <TextField
        id='filled-basic'
        label='Введіть назву міста...'
        variant='filled'
        inputRef={inputRef}
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
