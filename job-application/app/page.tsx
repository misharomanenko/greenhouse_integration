'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import { motion } from 'framer-motion';

import { ArrowRight } from 'lucide-react';

import { Button } from '@/app/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/app/components/ui/card';
import { jobListings } from '@/app/data/jobListings';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
    },
  },
};

const Dashboard: React.FC = () => {
  const router = useRouter();

  const handleViewJob = (id: string) => {
    router.push(`/job/${id}`);
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className='text-foreground w-full flex flex-col'
    >
      <motion.div 
        variants={itemVariants}
        className='mb-8 sm:mb-10'
      >
        <h1 className='text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-gray-100 leading-tight mb-4 sm:mb-6'>
          Open Positions
        </h1>
      </motion.div>
      
      <motion.p 
        variants={itemVariants}
        className='text-gray-600 dark:text-gray-300 leading-relaxed text-lg max-w-3xl mb-8 sm:mb-10'
      >
        Join our team and work on cutting-edge technology with industry leaders.
        We offer competitive compensation, great benefits, and opportunities for
        growth and learning.
      </motion.p>

      <motion.div 
        variants={itemVariants}
        className='mt-8 sm:mt-10'
      >
        <motion.div 
          variants={containerVariants}
          className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8'
        >
          {jobListings.map((job, index) => (
            <motion.div
              key={job.id}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card className='h-[400px] overflow-hidden transition-all duration-300 bg-white dark:bg-gray-800 border-none rounded-xl sm:rounded-2xl shadow-md hover:shadow-lg hover:shadow-gray-200 dark:hover:shadow-gray-700 flex flex-col'>
                <CardHeader className='bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 p-5 sm:p-6'>
                  <CardTitle className='text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-1 line-clamp-2'>
                    {job.title}
                  </CardTitle>
                  <CardDescription className='text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300'>
                    {job.company} • {job.location} • {job.type}
                  </CardDescription>
                </CardHeader>
                <CardContent className='p-5 sm:p-6 flex-grow overflow-hidden'>
                  <p className='text-gray-700 dark:text-gray-300 text-base sm:text-lg line-clamp-4'>
                    {job.description}
                  </p>
                </CardContent>
                <CardFooter className='bg-gray-50 dark:bg-gray-700 p-5 sm:p-6'>
                  <Button
                    onClick={() => handleViewJob(job.id)}
                    className='w-full bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-700 dark:to-gray-900 text-white hover:from-gray-800 hover:to-gray-600 dark:hover:from-gray-600 dark:hover:to-gray-800 transition-all duration-300 shadow-md rounded-full py-3 text-base sm:text-lg font-semibold group'
                  >
                    View Details 
                    <motion.span
                      className='ml-2 inline-block'
                      whileHover={{ x: 5 }}
                      transition={{ type: 'spring', stiffness: 200 }}
                    >
                      <ArrowRight size={16} />
                    </motion.span>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default React.memo(Dashboard);
