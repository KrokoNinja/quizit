'use client';
import { notFound } from 'next/navigation';
import { useEffect, useState } from 'react';

const ReviewPoints = () => {
  const [points, setPoints] = useState<number | null>(null);

  useEffect(() => {
    const savedPoints = localStorage.getItem('points');
    if (!savedPoints) {
      notFound();
    } else {
      setPoints(parseInt(savedPoints));
    }
  }, []);

  return (
    <p className="text-lg">
      You finished the Quiz with {points}{' '}
      {points && points > 1 ? 'points' : 'point'}
    </p>
  );
};

export default ReviewPoints;
