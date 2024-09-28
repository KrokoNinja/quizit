import { cn } from '@/lib/utils';
import { Button, ButtonProps } from './ui/button';

type DashboardButtonProps = ButtonProps;

const DashboardButton = ({ className, ...props }: DashboardButtonProps) => {
  return (
    <Button
      {...props}
      className={cn('h-full w-full py-10 text-xl font-bold', className)}
    />
  );
};

export default DashboardButton;
