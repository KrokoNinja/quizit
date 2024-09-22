import ChatBox from '@/components/ChatBox'
import CreateTeamDialog from '@/components/CreateTeamDialog'
import SinglePageWrapper from '@/components/SinglePageWrapper'
import Teams from '@/components/Teams'
import { getSession } from '@/lib/actions'

const Page = async () => {

  const session = await getSession();

  return (
    <SinglePageWrapper>
      <div className='flex justify-between items-center'>
        <h1>Join a Team or create one yourself</h1>
        <CreateTeamDialog />
      </div>
      <Teams />
    </SinglePageWrapper>
  )
}

export default Page