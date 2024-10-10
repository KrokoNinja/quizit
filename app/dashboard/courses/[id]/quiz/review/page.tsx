'use client';
import ReviewPoints from '@/components/ReviewPoints';
import SinglePageWrapper from '@/components/SinglePageWrapper';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

const page = () => {
  const getQuizURL = () => {
    const url = window.location.href;
    const parts = url.split('/review');
    return parts[0];
  };

  const resetLocalStoragePoints = () => {
    localStorage.removeItem('points');
  };

  return (
    <SinglePageWrapper className="flex h-full flex-col items-center">
      <h1 className="text-3xl">Review</h1>
      <div className="flex h-full items-center">
        <div className="flex flex-1 flex-col justify-start gap-4">
          <ReviewPoints />
          <Link href={getQuizURL()}>
            <Button onClick={() => resetLocalStoragePoints()}>
              Start another quiz
            </Button>
          </Link>
          <Link href="/dashboard/leaderboard">
            <Button onClick={() => resetLocalStoragePoints()}>
              See the leaderboard
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button onClick={() => resetLocalStoragePoints()}>
              Back to the dashboard
            </Button>
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
