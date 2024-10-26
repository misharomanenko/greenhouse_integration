import React from 'react';

import { motion } from 'framer-motion';

const ModernLoader: React.FC = () => {
  return (
    <div className='flex h-screen items-center justify-center'>
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.5,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
        className='relative w-32 h-32'
      >
        <motion.div
          className='absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-blue-400 to-blue-300'
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        <motion.div
          className='absolute inset-2 rounded-full bg-gray-900'
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            duration: 0.5,
            delay: 0.2,
          }}
        />
        <motion.div
          className='absolute inset-0 flex items-center justify-center'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.svg
            width='40'
            height='40'
            viewBox='0 0 120 120'
            className='fill-gray-200'
          >
            <motion.g
              transform='translate(-40,160) scale(0.1,-0.1)'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 1,
                ease: 'easeInOut',
                repeat: Infinity,
                repeatType: 'reverse',
              }}
            >
              <motion.path
                d='M554 1510 c-50 -20 -54 -39 -54 -272 0 -120 3 -218 8 -218 9 0 492 483 492 493 0 10 -420 8 -446 -3z'
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{
                  duration: 1.5,
                  ease: 'easeInOut',
                  repeat: Infinity,
                  repeatType: 'loop',
                }}
              />
              <motion.path
                d='M1020 1513 c0 -10 482 -493 493 -493 4 0 7 99 7 219 0 218 0 220 -24 248 l-24 28 -226 3 c-124 2 -226 -1 -226 -5z'
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{
                  duration: 1.5,
                  ease: 'easeInOut',
                  repeat: Infinity,
                  repeatType: 'loop',
                  delay: 0.3,
                }}
              />
              <motion.path
                d='M1039 981 l-29 -29 0 -222 0 -222 250 243 c138 134 250 247 250 251 0 4 -99 8 -221 8 l-221 0 -29 -29z'
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{
                  duration: 1.5,
                  ease: 'easeInOut',
                  repeat: Infinity,
                  repeatType: 'loop',
                  delay: 0.6,
                }}
              />
              <motion.path
                d='M500 779 l0 -221 29 -29 29 -29 221 0 c122 0 221 3 221 8 0 9 -483 492 -493 492 -4 0 -7 -99 -7 -221z'
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{
                  duration: 1.5,
                  ease: 'easeInOut',
                  repeat: Infinity,
                  repeatType: 'loop',
                  delay: 0.9,
                }}
              />
            </motion.g>
          </motion.svg>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ModernLoader;
