import SinglePageWrapper from "@/components/SinglePageWrapper"
import prisma from "@/lib/db"
import Course from "@/components/Course"
import CourseDialog from "@/components/CourseDialog";

const Page = async () => {

  const courses = await prisma.course.findMany({
    select: {
      id: true,
      name: true,
      tutorId: true,
      abbreviation: true
    }
  });

  return (
    <SinglePageWrapper>
      <div className="flex justify-between items-center mb-6">
        <h1>All Courses</h1>
        <CourseDialog title="Create course" triggerText="Create course" description="The course you want to learn for is not shown? Create a new one." />
      </div>
      {courses.length === 0 ?
        <p>No courses found</p>
        :
        <ul className="flex flex-col gap-6 lg:flex-row">
          {courses.map(course => (
            <Course key={course.id} course={course} />
          ))}
        </ul>
      }
    </SinglePageWrapper>
  )
}

export default Page