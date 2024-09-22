import { cn } from "@/lib/utils"
import { Button, ButtonProps } from "./ui/button"

type DashboardButtonProps = ButtonProps

const DashboardButton = ({className, ...props}: DashboardButtonProps) => {
  return (
    <Button {...props} className={cn("py-10", className)} />
  )
}

export default DashboardButton