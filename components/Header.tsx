import Image from 'next/image';
import { ThemeModeToggle } from './ThemeModeToggle';
import { AspectRatio } from './ui/aspect-ratio';
import { Button } from './ui/button';
import Link from 'next/link';
import { getSession, logout } from '@/lib/actions';

const Header = async () => {
  const session = await getSession();

  return (
    <header className="h-24 fixed flex w-full items-center justify-between bg-background p-6">
      <Link href={session.isLoggedIn ? '/dashboard' : '/'}>
        <div className="w-10">
          <AspectRatio ratio={238 / 261}>
            <Image
              src={'/quizit-logo.png'}
              alt="QuizIT Logo"
              width={476}
              height={522}
            />
          </AspectRatio>
        </div>
      </Link>
      <div className="flex gap-x-6">
        <ThemeModeToggle />
        {session.isLoggedIn ? (
          <div className="flex gap-x-6">
            <Link href="/dashboard/profile">
              <Button variant="secondary">Profile</Button>
            </Link>
            <form action={logout}>
              <Button>Logout</Button>
            </form>
          </div>
        ) : (
          <div className="flex gap-x-6">
            <Link href="/login">
              <Button>Login</Button>
            </Link>
            <Link href="/signup">
              <Button>Signup</Button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
