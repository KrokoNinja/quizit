import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-between p-24">
      <div className="w-64">
        <AspectRatio ratio={238 / 261}>
          <Image
            src={'/quizit-logo.png'}
            alt="QuizIT Logo"
            width={476}
            height={522}
          />
        </AspectRatio>
      </div>
      <h1 className="text-primary">QuizIT – People love IT</h1>
      <Link href="/signup">
        <Button variant="tertiary">Get Started</Button>
      </Link>
    </div>
  );
}
