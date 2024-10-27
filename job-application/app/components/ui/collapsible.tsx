'use client';

import * as React from 'react';

import * as CollapsiblePrimitive from '@radix-ui/react-collapsible';
import { ChevronDown, ChevronUp } from 'lucide-react';

import { cn } from '@/lib/utils';

const Collapsible = CollapsiblePrimitive.Root;

const CollapsibleTrigger = React.forwardRef<
  React.ElementRef<typeof CollapsiblePrimitive.CollapsibleTrigger>,
  React.ComponentPropsWithoutRef<
    typeof CollapsiblePrimitive.CollapsibleTrigger
  > & {
    icon?: React.ReactNode;
  }
>(({ className, children, icon, ...props }, ref) => (
  <CollapsiblePrimitive.CollapsibleTrigger
    ref={ref}
    className={cn(
      'flex w-full items-center justify-between rounded-t-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus-visible:ring focus-visible:ring-gray-500 focus-visible:ring-opacity-75 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700',
      className
    )}
    {...props}
  >
    {children}
    {icon || <ChevronDown className='h-4 w-4' />}
  </CollapsiblePrimitive.CollapsibleTrigger>
));

CollapsibleTrigger.displayName =
  CollapsiblePrimitive.CollapsibleTrigger.displayName;

const CollapsibleContent = React.forwardRef<
  React.ElementRef<typeof CollapsiblePrimitive.CollapsibleContent>,
  React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.CollapsibleContent>
>(({ className, children, ...props }, ref) => (
  <CollapsiblePrimitive.CollapsibleContent
    ref={ref}
    className={cn(
      'overflow-hidden transition-all data-[state=closed]:animate-collapse data-[state=open]:animate-expand',
      className
    )}
    {...props}
  >
    <div className='px-4 py-2 bg-white rounded-b-lg dark:bg-gray-900 dark:border-gray-700'>
      {children}
    </div>
  </CollapsiblePrimitive.CollapsibleContent>
));

CollapsibleContent.displayName =
  CollapsiblePrimitive.CollapsibleContent.displayName;

export { Collapsible, CollapsibleTrigger, CollapsibleContent };
