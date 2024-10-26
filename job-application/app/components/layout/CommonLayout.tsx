'use client';

import { useTheme } from 'next-themes';
import React, { ReactNode, useCallback, useEffect, useMemo } from 'react';

import { AnimatePresence, motion } from 'framer-motion';

import { useMediaQuery } from '@/app/hooks/misc/useMediaQuery';

interface CommonLayoutProps {
  children: ReactNode;
}

const variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const CommonLayout: React.FC<CommonLayoutProps> = React.memo(({ children }) => {
  const { theme } = useTheme();
  const isMobile = useMediaQuery('(max-width: 767px)');

  const backgroundClass = useMemo(
    () =>
      theme === 'dark'
        ? 'from-gray-900 via-gray-800 to-gray-700'
        : 'from-gray-50 via-gray-100 to-gray-200',
    [theme]
  );

  const contentClass = useMemo(
    () =>
      `relative z-10 ${isMobile ? '' : 'ml-[4.5rem]'} mx-auto px-4 py-2 ${isMobile ? 'pb-24' : ''}`,
    [isMobile]
  );

  return (
    <AnimatePresence mode='wait'>
      <motion.div
        className={`min-h-screen w-full bg-gradient-to-br ${backgroundClass}`}
        initial='initial'
        animate='animate'
        exit='exit'
        variants={variants}
        transition={{ duration: 0.5 }}
      >
        <div className='absolute inset-0 bg-grid-gray-200/20 dark:bg-grid-gray-800/20 z-0' />
        <motion.div
          className={contentClass}
          variants={variants}
          transition={{ delay: 0.1, duration: 0.4 }}
        >
          <motion.main
            className='bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-lg rounded-xl overflow-hidden w-full'
            whileHover={{
              boxShadow: '0 0 20px rgba(59, 130, 246, 0.4)',
              borderColor: 'rgba(59, 130, 246, 0.6)',
            }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className='p-6 lg:p-8'
              variants={variants}
              transition={{ delay: 0.2, duration: 0.3 }}
            >
              {children}
            </motion.div>
          </motion.main>
        </motion.div>
        <motion.div
          className='fixed inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-kp-blue/10 to-transparent dark:from-kp-blue/15'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        />
        <motion.div
          className='fixed top-0 right-0 w-1/4 h-full bg-gradient-to-l from-kp-green/5 to-transparent dark:from-kp-green/10'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        />
      </motion.div>
    </AnimatePresence>
  );
});

CommonLayout.displayName = 'CommonLayout';

export default CommonLayout;
