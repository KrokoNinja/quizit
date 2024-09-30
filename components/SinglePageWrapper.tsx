import { cn } from '@/lib/utils';
import { HTMLAttributes } from 'react';

type SinglePageWrapperProps = HTMLAttributes<HTMLDivElement>;

const SinglePageWrapper = ({ className, ...props }: SinglePageWrapperProps) => {
  return <div {...props} className={cn('p-2 md:p-6 lg:p-10', className)} />;
};

export default SinglePageWrapper;
