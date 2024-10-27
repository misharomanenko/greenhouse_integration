import Link from 'next/link';
import { FaBriefcase, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import { IconBaseProps } from 'react-icons';
import { JobListing } from '@/app/data/jobListings';

type IconProps = IconBaseProps & { className?: string; 'aria-hidden'?: string };

interface JobCardProps {
  job: JobListing;
}

export function JobCard({ job }: JobCardProps) {
  return (
    <Link href={`/job/${job.id}`} className="block">
      <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300 p-8 border border-primary-200 dark:border-primary-700">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-primary-400">
          {job.title}
        </h2>
        <p className="text-gray-900 dark:text-neutral-300 mb-4 flex items-center text-lg">
          <span className="mr-3 text-primary-400"><FaBriefcase size="1em" /></span> 
          {job.company}
        </p>
        <p className="text-gray-900 dark:text-neutral-400 text-base flex items-center mb-6">
          <span className="mr-3 text-primary-400"><FaMapMarkerAlt size="1em" /></span>
          {job.location}
        </p>
        <div className="flex items-center">
          <FaClock 
            className="text-primary-400 text-base mr-3" 
            aria-hidden="true" 
            {...({} as IconProps)} 
          />
          <span className="bg-secondary-100 dark:bg-secondary-900 text-gray-900 dark:text-secondary-200 text-sm px-4 py-2 rounded-full">
            {job.type}
          </span>
        </div>
      </div>
    </Link>
  );
}
