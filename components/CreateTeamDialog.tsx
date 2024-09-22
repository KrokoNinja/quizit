"use client";
import { Dialog } from '@radix-ui/react-dialog'
import React, { useState } from 'react'
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Button } from './ui/button'
import { useFormState } from 'react-dom';
import { createTeam } from '@/lib/actions';
import { Label } from './ui/label';
import { Input } from './ui/input';

const CreateTeamDialog = () => {

  const [open, setOpen] = useState(false)
  const [state, formAction] = useFormState<any, FormData>(createTeam, {
    name: "",
  })

  return (
    <Dialog open={open} onOpenChange={() => setOpen(!open)}>
      <DialogTrigger asChild>
        <Button onClick={() => setOpen(true)}>Create Team</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form action={formAction} onSubmit={() => setOpen(false)}>
          <DialogHeader>
            <DialogTitle>Create team</DialogTitle>
            <DialogDescription>
              Create a team here. Click &quot;Create team&qout; when you are done.
            </DialogDescription>
          </DialogHeader>
          <Label>Team Name</Label>
          <Input type="text" name="name" />
          <DialogFooter>
            <Button type="submit">Create team</Button>
          </DialogFooter>
        </form>
        {state.error && <p>{state.error}</p>}
      </DialogContent>
    </Dialog>
  )
}

export default CreateTeamDialog