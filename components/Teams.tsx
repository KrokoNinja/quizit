import prisma from '@/lib/db'

const Teams = async () => {

  const teams = await prisma.team.findMany({
    select: {
      id: true,
      name: true,
      points: true,
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
            <li key={team.id} className='flex flex-col gap-2'>
              <h2>{team.name}</h2>
              <p>{team._count.users} members</p>
            </li>
          ))}
        </ul>
      }
    </>
  )
}

export default Teams