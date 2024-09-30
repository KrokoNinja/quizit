import SinglePageWrapper from '@/components/SinglePageWrapper';
import TeamInfo from '@/components/TeamInfo';

const page = ({ params }: { params: { id: string } }) => {
  return (
    <SinglePageWrapper>
      <TeamInfo id={params.id} />
    </SinglePageWrapper>
  );
};

export default page;
