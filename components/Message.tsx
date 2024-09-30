import { cn } from '@/lib/utils';

interface MessageProps extends React.HTMLAttributes<HTMLDivElement> {
  message: string;
  username: string;
  currentUser: string;
}

const Message = ({
  message,
  username,
  currentUser,
  ...props
}: MessageProps) => {
  const isCurrentUser = currentUser === username;

  return (
    <div
      className={cn(
        'my-2 max-w-xs rounded-lg p-2', // Common classes for both users
        isCurrentUser
          ? 'ml-auto bg-secondary-gradient text-white'
          : 'mr-auto bg-tertiary-gradient text-black', // Conditional classes
        props.className,
      )}>
      <p>{message}</p>
      <small>{username}</small>
    </div>
  );
};

export default Message;
