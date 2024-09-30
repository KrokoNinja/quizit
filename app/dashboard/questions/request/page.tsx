import BackButton from '@/components/BackButton';
import CreateQuestionForm from '@/components/CreateQuestionForm';
import SinglePageWrapper from '@/components/SinglePageWrapper';
import { getSession } from '@/lib/actions';
import prisma from '@/lib/db';

const Page = async () => {
  const courses = await prisma.course.findMany();
  const session = await getSession();

  return (
    <SinglePageWrapper>
      <BackButton>Back</BackButton>
      <h1>{session.isAdmin ? 'Create' : 'Request'} a question</h1>
      <CreateQuestionForm courses={courses} isAdmin={session.isAdmin} />
    </SinglePageWrapper>
  );
};

export default Page;
