'use client';

import WeatherCardsList from '@/features/weather/components/CityCardsList/CityCardsList';
import styles from './page.module.scss';
import Header from '@/shared/ui/Header/Header';
// import BgImage from '@/shared/ui/BgImage';
import BgAnimation from '@/shared/ui/BgAnimation/BgAnimation';
import { themeBlueBreeze } from '@/shared/ui/BgAnimation/BgAnimationAssets';

// const imgSrcMd =
//   'https://keyassets.timeincuk.net/inspirewp/live/wp-content/uploads/sites/8/2022/10/CLI371.weather.double_rainbow_cammie_czuchnicki-920x614.jpg';
// const imgSrcLg =
//   'https://cdn.mos.cms.futurecdn.net/ZcS3oG3vjPb4mnVcRYGbmk.jpg.webp';

export default function Home() {
  return (
    <div className={styles.container}>
      {/* <BgImage
        imgSrc={imgSrcLg}
        // imgSrc={imgSrcMd}
        imgAlt='bg-image-main'
      /> */}
      <BgAnimation colors={themeBlueBreeze} />
      <Header />
      <main className={styles.main}>
        <WeatherCardsList />
      </main>
    </div>
  );
}
