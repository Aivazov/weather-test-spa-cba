// features/weather/components/CityCardDetails/cityCardDetailsAssets.ts
import { 
  DeviceThermostat, 
  WaterDrop, 
  Compress, 
  Air, 
  Explore 
} from '@mui/icons-material';

export const commonOptions = (card: any) => [
  {
    title: 'Відчувається як',
    text: card?.feelsLike ? `${Math.round(card.feelsLike)}°C` : '--',
    icon: DeviceThermostat, // Передаем компонент иконки
  },
  {
    title: 'Вологість',
    text: card?.humidity ? `${card.humidity}%` : '--',
    icon: WaterDrop,
  },
  {
    title: 'Тиск',
    text: card?.pressure ? `${card.pressure} гПа` : '--',
    icon: Compress,
  },
  {
    title: 'Швидкість вітру',
    text: card?.windSpeed ? `${card.windSpeed} м/с` : '--',
    icon: Air,
  },
  // {
  //   title: 'Напрямок вітру',
  //   text: card?.windDeg ? `${card.windDeg}°` : '--',
  //   icon: Explore,
  // },
];

// export const commonOptions = (card: any) => [
//   {
//     title: 'Відчувається',
//     text: `${Math.round(card?.feelsLike)} °C`,
//   },
//   {
//     title: 'Вологість',
//     text: `${card?.humidity ? `${card?.humidity}%` : '--'}`,
//   },
//   {
//     title: 'Тиск, мм',
//     text: `${card?.pressure ? `${Math.round(card?.pressure)}` : '--'}`,
//   },
//   {
//     title: 'Вітер',
//     text: `${
//       card?.windSpeed
//         ? `${Math.round(card?.windSpeed * 3.6 * 10) / 10} км/г`
//         : '--'
//     }`,
//   },
// ];
