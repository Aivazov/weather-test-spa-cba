import WeatherClient from '@/features/weather/WeatherClient/WeatherClient';

// const imgSrcMd =
//   'https://keyassets.timeincuk.net/inspirewp/live/wp-content/uploads/sites/8/2022/10/CLI371.weather.double_rainbow_cammie_czuchnicki-920x614.jpg';
// const imgSrcLg =
//   'https://cdn.mos.cms.futurecdn.net/ZcS3oG3vjPb4mnVcRYGbmk.jpg.webp';

export default function Home() {
  return (
    <div>
      <WeatherClient />
    </div>
  );
}
