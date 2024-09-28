import ChangeUsernameForm from '@/components/ChangeUsernameForm';
import RoleIndicator from '@/components/RoleIndicator';
import SinglePageWrapper from '@/components/SinglePageWrapper';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { getSession } from '@/lib/actions';
import prisma from '@/lib/db';
import Link from 'next/link';
import { notFound } from 'next/navigation';

const page = async () => {
  const session = await getSession();

  const user = await prisma.user.findFirst({
    where: {
      email: session.email,
    },
  });

  if (!user) {
    return notFound();
  }

  const team = await prisma.team.findFirst({
    where: {
      id: user.teamId || '',
    },
  });

  return (
    <SinglePageWrapper className="flex h-full w-full flex-col items-center justify-center">
      <div className="mb-4 flex flex-col items-center gap-4 md:flex-row">
        <h1 className="mb-2 text-xl font-bold md:mb-0">
          Profile of {user.username}
        </h1>
        {(session.isAdmin || user.isTutor) && (
          <RoleIndicator isAdmin={session.isAdmin} isTutor={user.isTutor} />
        )}
      </div>
      <div className="w-full max-w-96">
        <Label>Email</Label>
        <Input type="email" value={user.email} disabled className="mb-4" />
        {team ? (
          <>
            <Label>Team</Label>
            <Input
              type="text"
              value={team.name || ''}
              disabled
              className="mb-4"
            />
          </>
        ) : (
          <div className="mb-4 flex items-center justify-center gap-2">
            <p>You are not in a team.</p>
            <Link href="/dashboard/team">
              <Button>You should join one</Button>
            </Link>
          </div>
        )}
        <ChangeUsernameForm user={user} />
      </div>
    </SinglePageWrapper>
  );
};

export default page;
