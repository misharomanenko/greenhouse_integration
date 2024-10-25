import { useState } from 'react';
import Link from 'next/link';
import { FaBriefcase, FaMapMarkerAlt, FaClock, FaSearch } from 'react-icons/fa';
import { jobListings } from '@/types/Jobs';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredJobs = jobListings.filter(job =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 dark:from-neutral-900 dark:to-neutral-800 text-neutral-800 dark:text-neutral-200 flex items-center justify-center">
      <main className="container mx-auto px-6 py-16">
        <h1 className="text-6xl font-bold mb-16 text-center text-primary-600 dark:text-primary-400 drop-shadow-lg">Job Openings</h1>
        
        <div className="max-w-3xl mx-auto mb-12">
          <div className="relative">
            <input
              type="text"
              placeholder="Search jobs..."
              className="w-full p-5 pl-14 rounded-full border-2 border-primary-300 dark:border-primary-700 bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 placeholder-neutral-500 dark:placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 transition duration-300 text-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="absolute left-5 top-1/2 transform -translate-y-1/2 text-primary-400 text-xl" />
          </div>
        </div>

        <div className="space-y-12 max-w-3xl mx-auto">
          {filteredJobs.map(job => (
            <Link href={`/job/${job.id}`} key={job.id} className="block">
              <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300 p-8 border border-primary-200 dark:border-primary-700">
                <h2 className="text-2xl font-semibold mb-4 text-primary-600 dark:text-primary-400">{job.title}</h2>
                <p className="text-neutral-600 dark:text-neutral-300 mb-4 flex items-center text-lg">
                  <FaBriefcase className="mr-3 text-primary-400" /> {job.company}
                </p>
                <p className="text-neutral-500 dark:text-neutral-400 text-base flex items-center mb-6">
                  <FaMapMarkerAlt className="mr-3 text-primary-400" /> {job.location}
                </p>
                <div className="flex items-center">
                  <FaClock className="text-primary-400 mr-3" />
                  <span className="bg-secondary-100 dark:bg-secondary-900 text-secondary-800 dark:text-secondary-200 text-sm px-4 py-2 rounded-full">
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
