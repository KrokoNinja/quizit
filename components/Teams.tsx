"use client"

import { IronSession } from 'iron-session';
import { Button } from './ui/button';
import { joinTeam } from '@/lib/actions';
import { SessionData } from '@/lib/utils';
import Link from 'next/link';

interface TeamsProps {
  teams: { id: string; name: string | null; _count: { users: number; }; }[],
  session: IronSession<SessionData>
}

const Teams = ({teams, session}: TeamsProps) => {

  if (!session.userId) {
    return <p>You need to be logged in to join a team.</p>
  }

  return (
    <>
      {teams.length === 0 ?
        <p>No teams created yet.</p>
        :
        <ul className='flex flex-col gap-6 lg:flex-row'>
          {teams.map(team => (
            <li key={team.id} className="flex items-center justify-between p-4 bg-white shadow-md rounded-lg hover:bg-gray-100 transition-all gap-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-800">{team.name}</h2>
              <p className="text-sm text-gray-600">{team._count.users} / 5 members</p>
            </div>
            {
              session.team === team.id ?
                <Link href={`/dashboard/team/${team.id}`}><Button variant="secondary">Go to Team page</Button></Link>
              :
                <Button disabled={team._count.users >= 5} variant="secondary" onClick={() => joinTeam(team.id, session.userId!)}>
                  Join
                </Button>
            }
          </li>
          ))}
        </ul>
      }
    </>
  )
}

export default Teams