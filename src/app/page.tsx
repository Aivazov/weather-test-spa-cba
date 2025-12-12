'use client';

import Header from '@/components/Header/Header';
import WeatherCardsList from '@/components/WeatherCardsList';
import styles from './page.module.scss';

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
