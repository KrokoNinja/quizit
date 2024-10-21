'use client';

import { useEffect, useState } from 'react';
import { socket } from '../socket';
import { useRouter } from 'next/navigation';
import CourseSelect from './CourseSelect';
import { Input } from './ui/input';
import { Label } from './ui/label';

interface TeamReadyStateProps {
  team: {
    users: { username: string; isAdmin: boolean; isTutor: boolean }[];
  } & { id: string; name: string | null; points: number };
  user: string;
}

const TeamReadyState = ({ team, user }: TeamReadyStateProps) => {
  const [socketId, setSocketId] = useState<string | undefined>(undefined);
  const [course, setCourse] = useState<string | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const [isReady, setIsReady] = useState<boolean>(false);
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
    socket.emit('joinRoom', { roomId: team.id, user: user });

    socket.on('userJoined', data => {
      setOnlineUsers(data);
    })

    socket.on('someoneReady', (data) => {
      //if all users are ready, redirect to quiz page
      if (data.course) {
        localStorage.setItem('course', data.course);
        const readyUsersCount = Object.values(data.usersReady).filter(
          (ready) => ready,
        ).length;

        if (readyUsersCount >= 2) {
          router.push(`/dashboard/team/${team.id}/room/quiz`);
        }
      }
      setUsersReady(data.usersReady);
    });

    socket.on('courseChange', (data) => {
      setCourse(data.courseData);
    });

    return () => {
      socket.off('userJoined');
      socket.off('someoneReady');
      socket.off('courseChange');
      socket.off('connect');
    };
  }, [team.id, router]);

  useEffect(() => {
    socket.emit('setCourse', { courseData: course, roomId: team.id });
  }, [course, team.id]);

  const setReady = () => {
    const newUsersReady = { ...usersReady, [user]: !usersReady[user] };
    setIsReady(!isReady);
    socket.emit('setReady', {
      usersReady: newUsersReady,
      roomId: team.id,
      course: course,
    });
    setUsersReady(newUsersReady);
    if (course) {
      localStorage.setItem('course', course);
      const readyUsersCount = Object.values(newUsersReady).filter(
        (ready) => ready,
      ).length;

      if (readyUsersCount >= 2) {
        router.push(`/dashboard/team/${team.id}/room/quiz`);
      }
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <CourseSelect course={course} setCourse={setCourse} />
      <ul className="mb-4 flex flex-col gap-2">
        {team.users.map((user) => (
          <li
            key={user.username}
            className={`flex items-center gap-6 rounded px-4 py-2 ${usersReady[user.username] ? 'bg-green-300' : 'bg-slate-400'}`}>
            {user.username}{' '}
            {onlineUsers.includes(user.username) &&
              <span className='w-2 h-2 bg-green-600 rounded-full'></span>
            }
          </li>
        ))}
      </ul>
      {course ?
        <div className='flex items-center gap-2'>
          <Input className='w-5' id="isReady" type="checkbox" checked={isReady} onChange={() => setReady()} />
          <Label htmlFor='isReady'>Ready?</Label>
        </div>
      :
          <p className='text-red-500'>Please select a course</p>
      }
    </div>
  );
};

export default TeamReadyState;
