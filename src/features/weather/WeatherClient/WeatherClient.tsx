'use client';
import BgAnimation from '@/shared/ui/BgAnimation/BgAnimation';
import Header from '@/widgets/Header/Header';
// import CityCardsList from '../CityCardsList/CityCardsList';
import { themeBlueBreeze } from '@/shared/ui/BgAnimation/BgAnimationAssets';
import styles from './weatherClient.module.css';
import CityCardsList from './components/CityCardsList/CityCardsList';
import Footer from '@/widgets/Footer/Footer';

const WeatherClient = () => {
  return (
    <div className='flex flex-col min-h-screen'>
      <BgAnimation colors={themeBlueBreeze} />
      <Header />
      <main className={styles.main}>
        <CityCardsList />
      </main>
      <Footer />
    </div>
  );
};

export default WeatherClient;
