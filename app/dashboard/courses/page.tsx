import SinglePageWrapper from '@/components/SinglePageWrapper';
import prisma from '@/lib/db';
import Course from '@/components/Course';
import CourseDialog from '@/components/CourseDialog';

const Page = async () => {
  const courses = await prisma.course.findMany({
    select: {
      id: true,
      name: true,
      tutorId: true,
      abbreviation: true,
    },
  });

  return (
    <SinglePageWrapper>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">All Courses</h1>
        <CourseDialog
          title="Create course"
          triggerText="Create course"
          description="The course you want to learn for is not shown? Create a new one."
        />
      </div>

      {courses.length === 0 ? (
        <p className="text-gray-500">No courses found</p>
      ) : (
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {courses.map((course) => (
            <Course key={course.id} course={course} />
          ))}
        </ul>
      )}
    </SinglePageWrapper>
  );
};

export default Page;
