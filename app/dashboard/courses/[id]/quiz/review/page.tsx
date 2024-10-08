'use client';
import SinglePageWrapper from '@/components/SinglePageWrapper';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { useEffect, useState } from 'react';

const page = () => {
  const [points, setPoints] = useState<number | null>(null);

  const getQuizURL = () => {
    const url = window.location.href;
    const parts = url.split('/review');
    return parts[0];
  };

  useEffect(() => {
    const savedPoints = localStorage.getItem('points');
    if (!savedPoints) {
      notFound();
    } else {
      setPoints(parseInt(savedPoints));
    }
  }, []);

  return (
    <SinglePageWrapper className="flex h-full flex-col items-center">
      <h1 className="text-3xl">Review</h1>
      <div className="flex h-full items-center">
        <div className="flex flex-1 flex-col justify-start gap-4">
          <p className="text-lg">
            You finished the Quiz with {points}{' '}
            {points && points > 1 ? 'points' : 'point'}
          </p>
          <Link href={getQuizURL()}>
            <Button>Start another quiz</Button>
          </Link>
          <Link href="/dashboard/leaderboard">
            <Button>See the leaderboard</Button>
          </Link>
          <Link href="/dashboard">
            <Button>Back to the dashboard</Button>
          </Link>
        </div>
        <Image
          src="/reviewer.png"
          width={460}
          height={460}
          alt="Reviewer Image"
          className="flex-1"
        />
      </div>
    </SinglePageWrapper>
  );
};

export default page;
