import React from 'react';

import { PlusIcon } from '@heroicons/react/24/outline';
import { IconLoader2 } from '@tabler/icons-react';
import { motion } from 'framer-motion';

import { Button } from '@/app/components/ui/button';

interface Props {
  title?: string;
  smallTitle?: string;
  subtitle?: React.ReactNode;
  buttonText?: string;
  count?: number;
  action?: () => void;
  divClass?: string;
  buttonDivClass?: string;
  showingIcon?: boolean;
  onButtonClick?: () => void;
  secondaryButtonText?: string;
  secondaryButtonClass?: string;
  secondaryAction?: () => void;
  isVerified?: boolean;
  loading?: boolean;
}

const Heading: React.FC<Props> = ({
  title,
  smallTitle,
  buttonText,
  count,
  action,
  subtitle,
  divClass,
  showingIcon,
  onButtonClick,
  secondaryButtonText,
  secondaryButtonClass,
  secondaryAction,
  isVerified,
  loading,
}) => {
  const countBgColor = count && count > 0 ? 'bg-primary' : 'bg-gray-300';

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={divClass || 'px-4 sm:px-6 md:px-10'}
    >
      <div className='mb-4 mt-4 flex flex-col'>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className='flex flex-col items-start justify-between gap-4 md:flex-row md:items-center'
        >
          <div className='flex flex-wrap items-center gap-2'>
            {smallTitle && (
              <h2 className='font-medium text-xl text-primary sm:text-2xl'>
                {smallTitle}
              </h2>
            )}
            <h1 className='font-regular text-2xl text-primary sm:text-3xl md:text-4xl'>
              {title}
            </h1>
            {isVerified !== undefined && (
              <div
                className={`rounded px-2 py-1 text-sm text-white ${
                  isVerified ? 'bg-green-500' : 'bg-yellow-400'
                }`}
              >
                {isVerified ? 'Verified' : 'Pending Verification'}
              </div>
            )}
            {count !== undefined && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className={`mb-2 rounded px-3 py-1 text-white ${countBgColor}`}
              >
                {count}
              </motion.div>
            )}
          </div>
          <div className='flex flex-col items-center gap-2 md:flex-row md:items-center'>
            {secondaryButtonText && secondaryAction && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <Button
                  className={
                    secondaryButtonClass ||
                    'rounded border border-secondary bg-white font-medium text-secondary'
                  }
                  onClick={secondaryAction}
                >
                  {secondaryButtonText}
                </Button>
              </motion.div>
            )}
            {buttonText && (action || onButtonClick) && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <Button onClick={onButtonClick || action}>
                  {showingIcon && <PlusIcon className='mr-2 h-4 w-4' />}
                  {loading ? (
                    <div className='flex items-center'>
                      <span className='pr-1.5'>Saving ...</span>
                      <IconLoader2 className='animate-spin ml-2' />
                    </div>
                  ) : (
                    buttonText
                  )}
                </Button>
              </motion.div>
            )}
          </div>
        </motion.div>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className='mt-2 font-light text-sm text-muted md:mt-1'
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </motion.div>
  );
};

export default React.memo(Heading);
