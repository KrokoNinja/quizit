import prisma from '@/lib/db';

const TeamLeaderboard = async () => {
  const teams = await prisma.team.findMany({
    select: {
      name: true,
      points: true,
    },
    orderBy: {
      points: 'desc',
    },
  });

  return (
    <div className="overflow-x-auto">
      <table className="bg-tertiary/40 min-w-full">
        <thead className="bg-secondary-gradient text-white">
          <tr>
            <th className="px-6 py-3 text-left">Team</th>
            <th className="px-6 py-3 text-left">Points</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((team) => (
            <tr key={team.name}>
              <td className="px-6 py-3">{team.name}</td>
              <td className="px-6 py-3">{team.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TeamLeaderboard;
