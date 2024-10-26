'use client';

import { useTheme } from 'next-themes';
import React, { ReactNode, useEffect, useMemo, useState } from 'react';

import {
  AnimatePresence,
  motion,
  useAnimation,
  useSpring,
} from 'framer-motion';

import { useMediaQuery } from '@/app/hooks/misc/useMediaQuery';

interface MainLayoutProps {
  children: ReactNode;
}

const variants = {
  initial: { opacity: 0, y: 6 }, // Even more subtle animation
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -6 },
};

const MainLayout: React.FC<MainLayoutProps> = React.memo(({ children }) => {
  const { theme } = useTheme();
  const isMobile = useMediaQuery('(max-width: 767px)');
  const isDark = theme === 'dark';
  const controls = useAnimation();
  const [mounted, setMounted] = useState(false);

  // Enhanced spring animation for smoother gradient movement
  const gradientX = useSpring(0, {
    stiffness: 80,
    damping: 35,
    restDelta: 0.0005,
  });

  // Subtle background animation
  useEffect(() => {
    controls.start({
      opacity: [0.8, 1, 0.8],
      transition: { duration: 5, repeat: Infinity, ease: 'easeInOut' },
    });
  }, [controls]);

  const contentClass = useMemo(
    () =>
      `relative z-10 ${isMobile ? '' : 'ml-[4.5rem]'} ${
        isMobile ? 'pb-16' : ''
      } mx-auto max-w-[1920px] px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 lg:pt-10`, // Adjusted padding
    [isMobile]
  );

  // Add mounted state to prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render anything until mounted to prevent flash
  if (!mounted) {
    return null;
  }

  return (
    <AnimatePresence mode='wait'>
      <motion.div
        className={`min-h-screen bg-gradient-to-b ${
          isDark
            ? 'from-gray-900 via-gray-800/95 to-gray-900'
            : 'from-gray-50 via-white/95 to-gray-50'
        } transition-colors duration-500`}
        initial='initial'
        animate='animate'
        exit='exit'
        variants={variants}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Refined gradient overlay with subtle animation */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${
            isDark
              ? 'from-kp-blue/3 via-transparent to-blue-900/5'
              : 'from-blue-50/30 via-transparent to-gray-50/20'
          } z-0`}
          initial={{ opacity: 0 }}
          animate={controls}
          style={{ x: gradientX }}
        />

        {/* Enhanced mesh gradient */}
        <motion.div
          className='absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-gray-900/[0.02] via-transparent to-transparent dark:from-white/[0.02] z-0'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        />

        {/* Optimized grid pattern */}
        <motion.div
          className='absolute inset-0 bg-grid-gray-200/[0.06] dark:bg-grid-gray-800/[0.06] z-0'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
        />

        <motion.div
          className={contentClass}
          variants={variants}
          transition={{ delay: 0.05, duration: 0.35 }}
        >
          <motion.main
            className={`relative bg-white/95 dark:bg-gray-800/95 backdrop-blur-lg 
              rounded-2xl overflow-hidden w-full shadow-lg 
              border border-gray-100/40 dark:border-gray-700/40
              transition-all duration-500 ease-out
              hover:shadow-xl hover:border-gray-200/40 dark:hover:border-gray-600/40
              transform-gpu will-change-transform`}
            initial={{ y: 0, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <motion.div
              className='px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8'
              variants={variants}
              transition={{ delay: 0.15, duration: 0.35 }}
            >
              {children}
            </motion.div>
          </motion.main>
        </motion.div>

        {/* Refined decorative elements */}
        <motion.div
          className={`fixed bottom-0 left-0 w-full h-3/4 
            bg-gradient-to-t from-blue-50/20 via-blue-50/5 to-transparent 
            dark:from-blue-900/15 dark:via-blue-900/3 dark:to-transparent 
            pointer-events-none blur-2xl mix-blend-normal`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
        />
        <motion.div
          className={`fixed top-0 right-0 w-3/4 h-full 
            bg-gradient-to-l from-gray-50/20 via-gray-50/5 to-transparent 
            dark:from-gray-800/15 dark:via-gray-800/3 dark:to-transparent 
            pointer-events-none blur-2xl mix-blend-normal`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
        />
      </motion.div>
    </AnimatePresence>
  );
});

MainLayout.displayName = 'MainLayout';

export default MainLayout;
