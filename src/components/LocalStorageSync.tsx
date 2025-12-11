'use client';

import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '@/redux/store';

export default function LocalStorageSync() {
  const cards = useSelector((s: RootState) => s.weather.cards);

  useEffect(() => {
    localStorage.setItem('weatherCards', JSON.stringify(cards));
  }, [cards]);

  return null;
}
