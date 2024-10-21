import ChatBox from '@/components/ChatBox';
import SinglePageWrapper from '@/components/SinglePageWrapper';
import { getSession, getTeam } from '@/lib/actions';
import dynamic from 'next/dynamic';
import { redirect } from 'next/navigation';

const TeamQuizBox = dynamic(() => import('@/components/TeamQuizBox'), {ssr: false});

const page = async ({ params }: { params: { id: string } }) => {
  const session = await getSession();

  if (!session.username) {
    return redirect('/login');
  }

  return (
    <SinglePageWrapper>
      <h1 className='hidden' aria-hidden="true" aria-label="Quiz Page">Quiz Page</h1>
      <TeamQuizBox teamId={params.id} />
      <ChatBox username={session.username} roomId={params.id} />
    </SinglePageWrapper>
  );
};

export default page;
