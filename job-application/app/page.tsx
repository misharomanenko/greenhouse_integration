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
import { useJobApi } from '@/app/hooks/core/useJobApi';
import { message } from 'antd';

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

// Update the JobDetails interface to match the full API response
interface JobDetails {
  id: number;
  name: string;
  status: string;
  departments: Array<{
    id: number;
    name: string;
  }>;
  offices: Array<{
    id: number;
    name: string;
    location: {
      name: string | null;
    };
  }>;
  custom_fields: {
    employment_type: string | null;
    salary_range: {
      min_value: string;
      max_value: string;
      unit: string;
    };
  };
  keyed_custom_fields: {
    employment_type: {
      name: string;
      type: string;
      value: string | null;
    };
    salary_range: {
      name: string;
      type: string;
      value: {
        min_value: string;
        max_value: string;
        unit: string;
      };
    };
  };
}

interface ApiResponse {
  message: string;
  data: JobDetails;
}

const Dashboard: React.FC = () => {
  const router = useRouter();
  const { getJobDetails } = useJobApi();
  const [jobDetails, setJobDetails] = React.useState<JobDetails | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const loadJobDetails = async () => {
      try {
        const response = await getJobDetails('4285367007');
        if (response && response.data) {
          setJobDetails(response.data);
        } else {
          setError('No job data available');
        }
      } catch (error) {
        console.error('Error loading job data:', error);
        setError('Failed to load job details');
        message.error('Failed to load job details');
      }
    };

    loadJobDetails();
  }, []); // Remove getJobDetails from dependency array since it's now memoized

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!jobDetails) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-gray-100"></div>
      </div>
    );
  }

  // Format salary range
  const formatSalary = (min: string, max: string, unit: string) => {
    return `${unit}${parseInt(min)}k-${parseInt(max)}k/year`;
  };

  const handleViewJob = (id: string) => {
    router.push(`/job/${id}`);
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className='text-foreground w-full flex flex-col items-center'
    >
      <motion.div 
        variants={itemVariants}
        className='mb-6 sm:mb-8 max-w-[1000px] w-full'
      >
        <h1 className='text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100 leading-tight mb-3 sm:mb-4'>
          Open Position
        </h1>
      </motion.div>

      <motion.div 
        variants={itemVariants}
        className='mt-6 sm:mt-8 max-w-[400px] w-full'
      >
        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleViewJob(jobDetails.id.toString())}
          className="cursor-pointer"
        >
          <Card className='h-auto overflow-hidden transition-all duration-300 bg-white dark:bg-gray-800 border-none rounded-lg sm:rounded-xl shadow-md hover:shadow-lg hover:shadow-gray-200 dark:hover:shadow-gray-700 flex flex-col'>
            <CardHeader className='bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 p-4'>
              <CardTitle className='text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1 line-clamp-1'>
                {jobDetails.name}
              </CardTitle>
              <CardDescription className='text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300'>
                {jobDetails.departments[0]?.name || 'Department N/A'} • {jobDetails.offices[0]?.name || 'Location N/A'}
              </CardDescription>
            </CardHeader>
            <CardContent className='p-4'>
              <div className='space-y-2'>
                <p className='text-sm text-gray-600 dark:text-gray-400'>
                  <span className='font-medium'>Status:</span> {jobDetails.status.charAt(0).toUpperCase() + jobDetails.status.slice(1)}
                </p>
                {jobDetails.custom_fields.salary_range && (
                  <p className='text-sm text-gray-600 dark:text-gray-400'>
                    <span className='font-medium'>Salary Range:</span> {formatSalary(
                      jobDetails.custom_fields.salary_range.min_value,
                      jobDetails.custom_fields.salary_range.max_value,
                      jobDetails.custom_fields.salary_range.unit
                    )}
                  </p>
                )}
                {jobDetails.custom_fields.employment_type && (
                  <p className='text-sm text-gray-600 dark:text-gray-400'>
                    <span className='font-medium'>Employment Type:</span> {jobDetails.custom_fields.employment_type}
                  </p>
                )}
              </div>
            </CardContent>
            <CardFooter className='bg-gray-50 dark:bg-gray-700 p-4'>
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  handleViewJob(jobDetails.id.toString());
                }}
                className='w-full bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-700 dark:to-gray-900 text-white hover:from-gray-800 hover:to-gray-600 dark:hover:from-gray-600 dark:hover:to-gray-800 transition-all duration-300 shadow-md rounded-full py-2 text-sm sm:text-base font-semibold group'
              >
                View Details 
                <motion.span
                  className='ml-2 inline-block'
                  whileHover={{ x: 5 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                >
                  <ArrowRight size={14} />
                </motion.span>
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default React.memo(Dashboard);
