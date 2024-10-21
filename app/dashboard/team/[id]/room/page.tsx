import SinglePageWrapper from '@/components/SinglePageWrapper';
import TeamReadyState from '@/components/TeamReadyState';
import { getSession, getTeam } from '@/lib/actions';
import { notFound, redirect } from 'next/navigation';

const page = async ({ params }: { params: { id: string } }) => {
  const team = await getTeam(params.id);
  const session = await getSession();

  if (!team) {
    return notFound();
  }

  if (!session.username) {
    return redirect('/login');
  }

  return (
    <SinglePageWrapper className="flex flex-col gap-10">
      <TeamReadyState team={team} user={session.username} />
    </SinglePageWrapper>
  );
};

export default page;
