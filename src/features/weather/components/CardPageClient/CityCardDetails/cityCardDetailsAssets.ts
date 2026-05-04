export const commonOptions = (card: any) => [
  {
    title: 'Відчувається',
    text: `${Math.round(card?.feelsLike)} °C`,
  },
  {
    title: 'Вологість',
    text: `${card?.humidity ? `${card?.humidity}%` : '--'}`,
  },
  {
    title: 'Тиск, мм',
    text: `${card?.pressure ? `${Math.round(card?.pressure)}` : '--'}`,
  },
  {
    title: 'Вітер',
    text: `${
      card?.windSpeed
        ? `${Math.round(card?.windSpeed * 3.6 * 10) / 10} км/г`
        : '--'
    }`,
  },
];
