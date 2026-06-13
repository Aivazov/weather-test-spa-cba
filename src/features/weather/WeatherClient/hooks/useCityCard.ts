// src/features/weather/components/WeatherClient/hooks/useCityCard.ts

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { deleteWeatherCard } from '@/features/weather/store/weatherSlice';

interface UseCityCardProps {
  id: string;
  temperature: number;
  humidity: number | null;
  condition: string | null;
  icon: string | null;
}

export const useCityCard = ({
  id,
  temperature,
  humidity,
  condition,
  icon,
}: UseCityCardProps) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const safeIcon = icon ?? '01d';
  const safeTemp = Math.round(temperature) ?? '--';
  const safeHumidity = humidity ?? '--';
  const safeCondition = condition ?? 'невідомо';

  const handleDeleteClick = () => setDeleteDialogOpen(true);
  const handleDeleteCancel = () => setDeleteDialogOpen(false);

  const handleDeleteConfirm = () => {
    dispatch(deleteWeatherCard(id));
    setDeleteDialogOpen(false);
  };

  const handleMoreInfoClick = () => {
    router.push(`/card/${id}`);
  };

  return {
    deleteDialogOpen,
    safeIcon,
    safeTemp,
    safeHumidity,
    safeCondition,
    handleDeleteClick,
    handleDeleteCancel,
    handleDeleteConfirm,
    handleMoreInfoClick,
  };
};
