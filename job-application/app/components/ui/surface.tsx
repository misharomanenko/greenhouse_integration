import { forwardRef } from 'react';

import { cva, VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const surfaceVariants = cva('ring-brand rounded-md', {
  variants: {
    elevation: {
      0: 'shadow-none',
      1: 'backdrop-blur-sm text-gray-700 bg-opacity-10 shadow-md shadow-primary/10 z-10 ring-line-blue ring-1',
      2: ' backdrop-blur-sm text-gray-900 bg-opacity-10 shadow-soft z-20 ring-line-blue ring-1 border border-line-blue',
    },
  },
});

type SurfaceProps = VariantProps<typeof surfaceVariants> &
  React.HTMLAttributes<HTMLDivElement>;

const Surface = forwardRef<HTMLDivElement, SurfaceProps>(
  ({ className, elevation, children, ...props }, ref) => {
    return (
      <div
        className={cn(surfaceVariants({ elevation }), className)}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Surface.displayName = 'Surface';

export { Surface, surfaceVariants };
