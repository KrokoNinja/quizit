import prisma from "@/lib/db";

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
      <table className="min-w-full bg-white">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="py-3 px-6 text-left">Team</th>
            <th className="py-3 px-6 text-left">Points</th>
          </tr>
        </thead>
        <tbody>
          {teams.map(team => (
            <tr key={team.name} className="border-gray-200 hover:bg-gray-100">
              <td className="text-black py-3 px-6">{team.name}</td>
              <td className="text-black py-3 px-6">{team.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TeamLeaderboard