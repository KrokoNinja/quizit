import SinglePageWrapper from '@/components/SinglePageWrapper';
import prisma from '@/lib/db';

const page = async () => {

  const users = await prisma.user.findMany({
    select: {
      username: true,
      points: true,
    },
    orderBy: {
      points: 'desc',
    },
  });

  return (
    <SinglePageWrapper>
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-3xl font-bold text-center mb-8">Leaderboard</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-3 px-6 text-left">Username</th>
                <th className="py-3 px-6 text-left">Points</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.username} className="border-gray-200 hover:bg-gray-100">
                  <td className="text-black py-3 px-6">{user.username}</td>
                  <td className="text-black py-3 px-6">{user.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </SinglePageWrapper>
  )
}

export default page;