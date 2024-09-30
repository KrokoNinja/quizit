'use client';

import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { Button } from './ui/button';
import { redirect, useRouter } from 'next/navigation';

interface TeamReadyStateProps {
  team: {
    users: { username: string; isAdmin: boolean; isTutor: boolean }[];
  } & { id: string; name: string | null; points: number };
  user: string;
}

const socket = io('http://localhost:4000');

const TeamReadyState = ({ team, user }: TeamReadyStateProps) => {
  const [socketId, setSocketId] = useState<string | undefined>(undefined);
  const [usersReady, setUsersReady] = useState<{ [key: string]: boolean }>(
    team.users.reduce(
      (acc, user) => {
        acc[user.username] = false;
        return acc;
      },
      {} as { [key: string]: boolean },
    ),
  );
  const router = useRouter();

  useEffect(() => {
    socket.on('connect', () => {
      console.log(socket.id);
      setSocketId(socket.id);
    });
    socket.emit('joinRoom', { roomId: team.id });

    socket.on('someoneReady', (data) => {
      console.log('Someone ready', data);
      //if all users are ready, redirect to quiz page
      Object.values(data.usersReady).every((ready) => ready) &&
        router.push(`/dashboard/team/${team.id}/room/quiz`);
      setUsersReady(data.usersReady);
    });
  }, [team.id]);

  const setReady = () => {
    const newUsersReady = { ...usersReady, [user]: !usersReady[user] };
    socket.emit('setReady', { usersReady: newUsersReady, roomId: team.id });
    setUsersReady(newUsersReady);
    Object.values(newUsersReady).every((ready) => ready) &&
      router.push(`/dashboard/team/${team.id}/room/quiz`);
  };

  return (
    <div>
      <ul className="mb-4 flex flex-col gap-2">
        {team.users.map((user) => (
          <li
            key={user.username}
            className={`flex items-center gap-6 rounded px-4 py-2 ${usersReady[user.username] ? 'bg-green-300' : 'bg-slate-400'}`}>
            {user.username}
          </li>
        ))}
      </ul>
      <Button className="cursor-pointer" onClick={() => setReady()}>
        Ready
      </Button>
    </div>
  );
};

export default TeamReadyState;
