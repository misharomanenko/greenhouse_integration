import { forwardRef } from 'react';

import { Slot, Slottable } from '@radix-ui/react-slot';
import { IconLoader2 } from '@tabler/icons-react';
import { cva, VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

import { Surface, surfaceVariants } from './surface';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-md font-medium relative overflow-hidden transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-offset-1 disabled:pointer-events-none disabled:opacity-40',
  {
    variants: {
      variant: {
        default:
          'bg-primary-blue text-white hover:bg-light-blue transition-all duration-300 shadow-md py-2 px-4 text-sm font-semibold w-full sm:w-auto',
        destructive:
          'bg-error text-primary-white hover:bg-red-600 hover:shadow-[0_4px_30px_rgba(229,62,62,0.3)] dark:bg-red-600 dark:hover:bg-red-700',
        outline:
          'border border-line-blue bg-transparent text-kp-blue hover:bg-kp-blue/5 hover:border-kp-blue hover:text-dark-blue hover:shadow-[0_4px_30px_rgba(77,159,214,0.25)] dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700/30',
        secondary:
          'bg-light-gray text-dark-gray hover:bg-mid-gray hover:shadow-[0_4px_30px_rgba(77,159,214,0.25)] dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200',
        ghost:
          'text-kp-blue hover:bg-kp-blue/5 hover:text-dark-blue hover:shadow-[0_4px_25px_rgba(77,159,214,0.2)] dark:text-gray-300 dark:hover:bg-gray-700/30',
        link: 'text-kp-blue underline-offset-4 hover:underline hover:text-dark-blue dark:text-gray-300 dark:hover:text-white/90',
        invisible:
          'backdrop-blur-[2px] text-transparent hover:bg-white/10 hover:text-kp-blue hover:shadow-[0_4px_25px_rgba(77,159,214,0.2)] dark:hover:bg-black/10',
        success:
          'bg-kp-green text-primary-white hover:bg-green-600 hover:shadow-[0_4px_30px_rgba(0,168,107,0.35)] dark:bg-green-600 dark:hover:bg-green-700',
      },
      size: {
        default: 'h-9 px-4 py-2 text-sm',
        sm: 'h-8 px-3 py-2 text-xs',
        lg: 'h-12 px-8 py-3 text-base',
        icon: 'h-9 w-9',
        xl: 'h-14 px-10 py-4 text-lg font-semibold',
      },
      elevation: {
        none: '',
        sm: 'shadow-soft/50 backdrop-blur-[1px]',
        md: 'shadow-medium/40 backdrop-blur-[2px]',
        lg: 'shadow-strong/30 backdrop-blur-[3px]',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      elevation: 'none',
    },
  }
);

type ButtonElevation = 0 | 1 | 2;

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    Omit<VariantProps<typeof buttonVariants>, 'elevation'> {
  asChild?: boolean;
  loading?: boolean;
  elevation?: ButtonElevation | null;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      loading,
      children,
      elevation,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Surface elevation={elevation}>
        <Comp
          className={cn(
            buttonVariants({ variant, size }),
            loading && 'cursor-wait opacity-80',
            'group',
            className
          )}
          ref={ref}
          disabled={props.disabled || loading}
          {...props}
        >
          <span className='relative flex items-center justify-center gap-2'>
            {loading && (
              <IconLoader2 className='animate-spin h-4 w-4 transition-transform group-hover:scale-110' />
            )}
            <Slottable>{children}</Slottable>
          </span>
        </Comp>
      </Surface>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };
