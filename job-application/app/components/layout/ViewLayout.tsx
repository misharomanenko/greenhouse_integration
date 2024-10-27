'use client';

import { useTheme } from 'next-themes';
import React, { ReactNode, useMemo } from 'react';

import { AnimatePresence, motion } from 'framer-motion';

import { useMediaQuery } from '@/app/hooks/misc/useMediaQuery';

interface ViewLayoutProps {
  children: ReactNode;
}

const variants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
};

const ViewLayout: React.FC<ViewLayoutProps> = React.memo(({ children }) => {
  const { theme } = useTheme();
  const isMobile = useMediaQuery('(max-width: 767px)');

  const backgroundClass = useMemo(
    () => (theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'),
    [theme]
  );

  const contentClass = useMemo(
    () => `relative z-10 ${isMobile ? 'px-4 pb-20' : 'ml-[4.5rem] px-6'}`,
    [isMobile]
  );

  return (
    <AnimatePresence mode='wait'>
      <motion.div
        className={`min-h-screen ${backgroundClass} transition-colors duration-300`}
        initial='initial'
        animate='animate'
        exit='exit'
        variants={variants}
        transition={{ duration: 0.3 }}
      >
        {/* Subtle grid background */}
        <motion.div
          className='absolute inset-0 bg-grid-gray-200/10 dark:bg-grid-gray-800/10 z-0'
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.15 }}
          transition={{ duration: 0.8 }}
        />

        {/* Main content */}
        <motion.div
          className={contentClass}
          variants={variants}
          transition={{ duration: 0.3 }}
        >
          <motion.main
            className='bg-white dark:bg-gray-800 shadow-sm rounded-lg overflow-hidden backdrop-blur-sm'
            variants={variants}
            transition={{ duration: 0.2 }}
          >
            <div className='p-4 sm:p-6 lg:p-8'>{children}</div>
          </motion.main>
        </motion.div>

        {/* Subtle gradients */}
        <motion.div
          className='fixed bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-100/20 to-transparent dark:from-gray-900/20 pointer-events-none'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        />
        <motion.div
          className='fixed top-0 right-0 w-1/3 h-full bg-gradient-to-l from-kp-blue/5 to-transparent dark:from-kp-blue/10 pointer-events-none'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        />
      </motion.div>
    </AnimatePresence>
  );
});

ViewLayout.displayName = 'ViewLayout';

export default ViewLayout;
