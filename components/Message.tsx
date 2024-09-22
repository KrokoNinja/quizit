
import { cn } from "@/lib/utils"

interface MessageProps extends React.HTMLAttributes<HTMLDivElement> {
  message: string,
  username: string,
  currentUser: string
}

const Message = ({message, username, currentUser, ...props}: MessageProps) => {

  const isCurrentUser = currentUser === username

  return (
    <div
      className={cn(
        "p-2 rounded-lg my-2 max-w-xs", // Common classes for both users
        isCurrentUser ? "bg-blue-500 text-white ml-auto" : "bg-gray-300 text-black mr-auto", // Conditional classes
        props.className
      )}
    >
      <p>{message}</p>
      <small>{username}</small>
    </div>
  )
}

export default Message