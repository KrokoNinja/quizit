import prisma from '@/lib/db';

const SoloLeaderboard = async () => {
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
    <div className="overflow-x-auto">
      <table className="bg-tertiary/30 min-w-full">
        <thead className="bg-secondary-gradient text-white">
          <tr>
            <th className="px-6 py-3 text-left">Username</th>
            <th className="px-6 py-3 text-left">Points</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.username}>
              <td className="px-6 py-3">{user.username}</td>
              <td className="px-6 py-3">{user.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SoloLeaderboard;
