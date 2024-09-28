import CreateTeamDialog from '@/components/CreateTeamDialog'
import SinglePageWrapper from '@/components/SinglePageWrapper'
import Teams from '@/components/Teams'
import { getSession } from '@/lib/actions'
import prisma from '@/lib/db'

const Page = async () => {

  const session = await getSession();

  const teams = await prisma.team.findMany({
    select: {
      id: true,
      name: true,
      _count: {
        select: {users: true}
      }
      }
    });

  return (
    <SinglePageWrapper>
      <div className='flex justify-between items-center'>
        <h1>Join a Team or create one yourself</h1>
        <CreateTeamDialog />
      </div>
      <Teams teams={teams} session={session} />
    </SinglePageWrapper>
  )
}

export default Page