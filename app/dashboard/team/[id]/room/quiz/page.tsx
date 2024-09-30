import ChatBox from '@/components/ChatBox';
import QuizBox from '@/components/QuizBox';
import SinglePageWrapper from '@/components/SinglePageWrapper';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { getSession, getTeam } from '@/lib/actions';
import prisma from '@/lib/db';
import type { Course } from '@prisma/client';
import { redirect } from 'next/navigation';

const page = async ({ params }: { params: { id: string } }) => {
  const session = await getSession();

  const courses = await prisma.course.findMany({
    where: {
      questions: {
        some: {
          published: true,
        },
      },
    },
    include: {
      _count: {
        select: { questions: true },
      },
    },
  });

  const filteredCourses = courses.filter(
    (course) => course._count.questions >= 3,
  );

  if (!session.username) {
    return redirect('/login');
  }

  return (
    <SinglePageWrapper>
      <h1>Quiz Page</h1>
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select a course" />
        </SelectTrigger>
        <SelectGroup>
          <SelectContent>
            {filteredCourses.map((course: Course) => (
              <SelectItem key={course.id} value={course.id}>
                {course.name}
              </SelectItem>
            ))}
          </SelectContent>
        </SelectGroup>
      </Select>
      <ChatBox username={session.username} roomId={params.id} />
    </SinglePageWrapper>
  );
};

export default page;
