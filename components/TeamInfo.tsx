import prisma from '@/lib/db';
import { notFound } from 'next/navigation';
import RoleIndicator from './RoleIndicator';
import TeamMember from './TeamMember';
import Link from 'next/link';
import { Button } from './ui/button';

interface TeamInfoProps {
  id: string;
}

const TeamInfo = async ({ id }: TeamInfoProps) => {
  const team = await prisma.team.findUnique({
    where: {
      id: id,
    },
    include: {
      users: {
        select: {
          username: true,
          isAdmin: true,
          isTutor: true,
        },
      },
    },
  });

  if (!team) {
    return notFound();
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="mb-6 text-3xl font-bold">Team {team.name}</h1>
      <div className="grid grid-cols-1 md:justify-items-center md:grid-cols-2">
        <div>
          <p className="mb-4 font-bold">Members</p>
          <ul className="flex flex-col gap-2">
            {team.users.map((user) => (
              <TeamMember key={user.username} user={user} />
            ))}
          </ul>
        </div>
        <div>
          <p className="mb-4 font-bold">Quiz</p>
          <p className="mb-2">Points: {team.points}</p>
          <p className="mb-2">Start a quiz to get points</p>
          <Link href={`/dashboard/team/${id}/room`}>
            <Button>Join room</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TeamInfo;
