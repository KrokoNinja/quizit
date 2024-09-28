"use client"
import { Button } from '@/components/ui/button'
import { deleteQuestion } from '@/lib/actions'
import React, { useEffect } from 'react'
import { useFormState } from 'react-dom'

const DeleteQuestionForm = ({id, buttonText}: {id: string, buttonText: string}) => {

  const [state, formAction] = useFormState<any, FormData>(deleteQuestion, "")

  useEffect(() => {
    if (state.state === "Question deleted") {
      window.location.href = "/dashboard/questions"
    }
  }
  , [state])

  return (
    <form action={formAction}>
      <input type="hidden" name="id" value={id} />
      <Button variant="destructive" type="submit">{buttonText}</Button>
      {state.error && <p>{state.error}</p>}
    </form>
  )
}

export default DeleteQuestionForm