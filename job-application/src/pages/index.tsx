import { useState } from 'react';
import Link from 'next/link';
import localFont from 'next/font/local';
import { FaSearch, FaBriefcase, FaMapMarkerAlt, FaClock } from 'react-icons/fa';

const geistSans = localFont({
  src: '../../public/fonts/GeistVF.woff',
  variable: '--font-geist-sans',
});

const geistMono = localFont({
  src: '../../public/fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
});

interface JobListing {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
}

const jobListings: JobListing[] = [
  { id: 1, title: 'Frontend Developer', company: 'TechCorp', location: 'Remote', type: 'Full-time' },
  { id: 2, title: 'Backend Engineer', company: 'DataSystems', location: 'New York, NY', type: 'Full-time' },
  { id: 3, title: 'UX Designer', company: 'DesignHub', location: 'San Francisco, CA', type: 'Contract' },
  { id: 4, title: 'DevOps Specialist', company: 'CloudOps', location: 'Remote', type: 'Part-time' },
];

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredJobs = jobListings.filter(job =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-background text-foreground`}>
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center text-accent">Job Openings</h1>
        
        <div className="mb-8 max-w-2xl mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Search jobs..."
              className="w-full p-4 pl-12 rounded-full border border-secondary bg-background text-foreground placeholder-secondary focus:outline-none focus:ring-2 focus:ring-accent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-secondary" />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredJobs.map(job => (
            <Link href={`/job/${job.id}`} key={job.id} className="block">
              <div className="bg-primary bg-opacity-10 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
                <h2 className="text-xl font-semibold mb-2 text-accent">{job.title}</h2>
                <p className="text-secondary mb-2 flex items-center">
                  <FaBriefcase className="mr-2" /> {job.company}
                </p>
                <p className="text-secondary text-sm flex items-center">
                  <FaMapMarkerAlt className="mr-2" /> {job.location}
                </p>
                <div className="flex items-center mt-4">
                  <FaClock className="text-accent mr-2" />
                  <span className="bg-accent bg-opacity-20 text-accent text-xs px-3 py-1 rounded-full">
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
