import DashboardButton from "@/components/DashboardButton"
import SinglePageWrapper from "@/components/SinglePageWrapper"
import { getSession } from "@/lib/actions";
import Link from "next/link"

const page = async () => {

  const session = await getSession();
  console.log(session.team)

  return (
    <SinglePageWrapper>
      <h1>Dashboard</h1>
      <div className="w-full flex justify-center items-center gap-6 flex-col">
        <Link href="/dashboard/questions">
          <DashboardButton className="px-10">Browse Questions</DashboardButton>
        </Link>
        <Link href="/dashboard/courses">
          <DashboardButton className="px-10">Browse Courses</DashboardButton>
        </Link>
        <Link href={session.team ? `/dashboard/team/${session.team}` : "/dashboard/team"}>
          <DashboardButton className="px-10">{session.team ? "Manage Team" : "Join / Create Team"}</DashboardButton>
        </Link>
      </div>
    </SinglePageWrapper>
  )
}

export default page