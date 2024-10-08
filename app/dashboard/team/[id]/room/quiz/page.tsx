import ChatBox from '@/components/ChatBox';
import SinglePageWrapper from '@/components/SinglePageWrapper';
import TeamQuizBox from '@/components/TeamQuizBox';
import { getSession, getTeam } from '@/lib/actions';
import { redirect } from 'next/navigation';

const page = async ({ params }: { params: { id: string } }) => {
  const session = await getSession();

  if (!session.username) {
    return redirect('/login');
  }

  return (
    <SinglePageWrapper>
      <h1>Quiz Page</h1>
      <TeamQuizBox />
      <ChatBox username={session.username} roomId={params.id} />
    </SinglePageWrapper>
  );
};

export default page;
