'use client';

import WeatherCardsList from '@/features/weather/components/CityCardsList';
import styles from './page.module.scss';
import Header from '@/shared/ui/Header/Header';

export default function Home() {
  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <WeatherCardsList />
      </main>
    </div>
  );
}
