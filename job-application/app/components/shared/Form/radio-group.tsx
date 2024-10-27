'use client';

import * as React from 'react';

import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { AnimatePresence, motion } from 'framer-motion';
import { Check } from 'lucide-react';

import { cn } from '@/lib/utils';

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => (
  <RadioGroupPrimitive.Root
    className={cn('flex flex-col space-y-2', className)}
    {...props}
    ref={ref}
  />
));
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => (
  <RadioGroupPrimitive.Item
    ref={ref}
    className={cn(
      'peer h-5 w-5 shrink-0 rounded-full border-2 border-gray-300 bg-white shadow-sm transition-all duration-200 ease-in-out ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-blue focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-primary-blue data-[state=checked]:bg-primary-blue dark:border-gray-600 dark:bg-gray-800 dark:ring-offset-gray-900 dark:focus-visible:ring-primary-blue dark:data-[state=checked]:border-primary-blue dark:data-[state=checked]:bg-primary-blue',
      className
    )}
    {...props}
  >
    <RadioGroupPrimitive.Indicator className='flex items-center justify-center'>
      <AnimatePresence>
        {props['data-state' as keyof typeof props] === 'checked' && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          >
            <Check className='h-3 w-3 text-white dark:text-gray-900' />
          </motion.div>
        )}
      </AnimatePresence>
    </RadioGroupPrimitive.Indicator>
  </RadioGroupPrimitive.Item>
));
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

const RadioGroupItemWithLabel = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> & {
    label: string;
    description?: string;
  }
>(({ className, label, description, ...props }, ref) => (
  <motion.label
    className='flex items-start space-x-3 cursor-pointer group p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 border border-gray-200 dark:border-gray-700'
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
  >
    <RadioGroupItem ref={ref} {...props} className={cn('mt-0.5', className)} />
    <div className='flex-grow'>
      <span className='text-sm font-medium leading-none group-hover:text-primary-blue transition-colors dark:text-gray-300 dark:group-hover:text-primary-blue'>
        {label}
      </span>
      {description && (
        <p className='mt-1 text-sm text-gray-500 group-hover:text-gray-700 transition-colors dark:text-gray-400 dark:group-hover:text-gray-300'>
          {description}
        </p>
      )}
    </div>
  </motion.label>
));
RadioGroupItemWithLabel.displayName = 'RadioGroupItemWithLabel';

export { RadioGroup, RadioGroupItem, RadioGroupItemWithLabel };
