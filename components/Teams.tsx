import prisma from '@/lib/db'
import { Button } from './ui/button';

const Teams = async () => {

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
    <>
      {teams.length === 0 ?
        <p>No teams created yet.</p>
        :
        <ul className='flex flex-col gap-6 lg:flex-row'>
          {teams.map(team => (
            <li key={team.id} className="flex items-center justify-between p-4 bg-white shadow-md rounded-lg hover:bg-gray-100 transition-all">
            <div>
              <h2 className="text-lg font-semibold text-gray-800">{team.name}</h2>
              <p className="text-sm text-gray-600">{team._count.users} / 5 members</p>
            </div>
            <Button className="font-semibold px-4 py-2 rounded-lg transition-all">
              Join
            </Button>
          </li>
          ))}
        </ul>
      }
    </>
  )
}

export default Teams