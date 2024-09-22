import ChangeUsernameForm from "@/components/ChangeUsernameForm";
import SinglePageWrapper from "@/components/SinglePageWrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getSession } from "@/lib/actions";
import prisma from "@/lib/db";
import Link from "next/link";
import { notFound } from "next/navigation";

const page = async () => {

  const session = await getSession();

  const user = await prisma.user.findFirst({
    where: {
      email: session.email
    }
  })

  if(!user) {
    return notFound();
  }

  const team = await prisma.team.findFirst({
    where: {
      id: user.teamId || ""
    }
  })


  return (
    <SinglePageWrapper className="w-full h-full flex flex-col items-center justify-center">
      <h1>Profile of {user.username} {session.isAdmin && "(ADMIN)"}</h1>
      <div className="w-full max-w-96">
        <Label>Email</Label>
        <Input type="email" value={user.email} disabled />
        {team ? (
          <>
            <Label>Team</Label>
            <Input type="text" value={team.name || ""} disabled />
          </>
        ) : (
          <div className="flex gap-2 items-center justify-center">
            <p>You are not in a team.</p>
            <Link href="/dashboard/team">
              <Button>You should join one</Button>
            </Link>
          </div>
        )}
        <ChangeUsernameForm user={user} />
      </div>
    </SinglePageWrapper>
  )
}

export default page