'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { updateUsername } from '@/lib/actions';
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { useFormState } from 'react-dom';

interface FormProps {
  user: {
    id: string;
    email: string;
    username: string;
    password: string;
  } | null;
}

const ChangeUsernameForm = (user: FormProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction] = useFormState<any, FormData>(updateUsername, '');
  const router = useRouter();

  useEffect(() => {
    if (state.state === 'Username updated') {
      formRef.current?.reset();
      router.refresh();
    }
  }, [state, router]);

  return (
    <>
      <form ref={formRef} action={formAction} className="flex flex-col gap-2">
        <Label>Change your Username</Label>
        <Input type="text" name="username" placeholder={user.user?.username} />
        <Button type="submit">Save</Button>
      </form>
      {state.error && <p>{state.error}</p>}
    </>
  );
};

export default ChangeUsernameForm;
