import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaBriefcase, FaMapMarkerAlt, FaClock, FaArrowLeft, FaSearch } from 'react-icons/fa';
import { jobListings } from '@/data/jobs';
import { currentUser } from '@/data/user';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredJobs = jobListings.filter(job =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 dark:from-neutral-900 dark:to-neutral-800 text-neutral-800 dark:text-neutral-200 flex items-center justify-center">
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-5xl font-bold mb-12 text-center text-primary-600 dark:text-primary-400 drop-shadow-lg">Job Openings</h1>
        
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search jobs..."
              className="w-full p-4 pl-12 rounded-full border-2 border-primary-300 dark:border-primary-700 bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 placeholder-neutral-500 dark:placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 transition duration-300"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary-400" />
          </div>
        </div>

        <div className="space-y-10 max-w-2xl mx-auto">
          {filteredJobs.map(job => (
            <Link href={`/job/${job.id}`} key={job.id} className="block">
              <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 border border-primary-200 dark:border-primary-700">
                <h2 className="text-xl font-semibold mb-3 text-primary-600 dark:text-primary-400">{job.title}</h2>
                <p className="text-neutral-600 dark:text-neutral-300 mb-3 flex items-center">
                  <FaBriefcase className="mr-2 text-primary-400" /> {job.company}
                </p>
                <p className="text-neutral-500 dark:text-neutral-400 text-sm flex items-center mb-4">
                  <FaMapMarkerAlt className="mr-2 text-primary-400" /> {job.location}
                </p>
                <div className="flex items-center">
                  <FaClock className="text-primary-400 mr-2" />
                  <span className="bg-secondary-100 dark:bg-secondary-900 text-secondary-800 dark:text-secondary-200 text-xs px-3 py-1 rounded-full">
                    {job.type}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
