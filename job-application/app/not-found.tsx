'use client';

import Link from 'next/link';
import React from 'react';

import { IconHome, IconRefresh } from '@tabler/icons-react';
import { motion } from 'framer-motion';

const NotFound = () => {
  return (
    <div className='flex h-screen flex-col items-center justify-center bg-background-light dark:bg-background-dark'>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='text-center'
      >
        <motion.h1
          className='text-9xl font-extrabold text-primary-black dark:text-primary-white'
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 100, delay: 0.2 }}
        >
          404
        </motion.h1>
        <motion.p
          className='mt-4 text-xl text-secondary dark:text-dark-mode-text'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          Oops! The page you're looking for doesn't exist.
        </motion.p>
      </motion.div>
      <motion.div
        className='mt-12 flex space-x-4'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Link
          href='/'
          className='inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-primary-white bg-primary-black hover:bg-dark-gray focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-black transition-all duration-300'
        >
          <IconHome className='mr-2 h-5 w-5' />
          Go Home
        </Link>
        <button
          onClick={() => window.location.reload()}
          className='inline-flex items-center px-6 py-3 border border-primary-black text-base font-medium rounded-md text-primary-black bg-primary-white hover:bg-light-gray dark:hover:bg-dark-gray dark:text-primary-white dark:border-primary-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-black dark:focus:ring-primary-white transition-all duration-300'
        >
          <IconRefresh className='mr-2 h-5 w-5' />
          Refresh
        </button>
      </motion.div>
    </div>
  );
};

export default NotFound;
