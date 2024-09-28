import DashboardButton from '@/components/DashboardButton';
import SinglePageWrapper from '@/components/SinglePageWrapper';
import { getSession } from '@/lib/actions';
import Link from 'next/link';

const page = async () => {
  const session = await getSession();
  console.log(session.team);

  return (
    <SinglePageWrapper className="h-full">
      <div className="grid h-full grid-cols-1 gap-6 md:grid-cols-2 md:px-16 md:py-32 lg:px-60 lg:py-48">
        <Link href="/dashboard/questions">
          <DashboardButton>Browse Questions</DashboardButton>
        </Link>
        <Link href="/dashboard/courses">
          <DashboardButton>Browse Courses</DashboardButton>
        </Link>
        <Link
          href={
            session.team ? `/dashboard/team/${session.team}` : '/dashboard/team'
          }>
          <DashboardButton>
            {session.team ? 'Manage Team' : 'Join / Create Team'}
          </DashboardButton>
        </Link>
        <Link href="/dashboard/leaderboard">
          <DashboardButton>Leaderboard</DashboardButton>
        </Link>
      </div>
    </SinglePageWrapper>
  );
};

export default page;
