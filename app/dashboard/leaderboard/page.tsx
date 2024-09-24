
import SinglePageWrapper from '@/components/SinglePageWrapper';
import prisma from '@/lib/db';
import { GetServerSideProps } from 'next';

type LeaderboardUser = {
  username: string;
  points: number;
}

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
      <h1>Leaderboard</h1>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.username}>
              <td>{user.username}</td>
              <td>{user.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </SinglePageWrapper>
  )
}

export default page