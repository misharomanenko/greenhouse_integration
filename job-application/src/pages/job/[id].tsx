import { useRouter } from 'next/router';
import Link from 'next/link';
import localFont from 'next/font/local';

const geistSans = localFont({
  src: '../../../public/fonts/GeistVF.woff',
  variable: '--font-geist-sans',
});

const geistMono = localFont({
  src: '../../../public/fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
});

interface JobListing {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  description: string;
}

const jobListings: JobListing[] = [
  { 
    id: 1, 
    title: 'Frontend Developer', 
    company: 'TechCorp', 
    location: 'Remote', 
    type: 'Full-time',
    description: 'We are looking for a skilled Frontend Developer to join our team...'
  },
  // Add more job listings here...
];

export default function JobDetails() {
  const router = useRouter();
  const { id } = router.query;

  const job = jobListings.find(job => job.id === Number(id));

  if (!job) {
    return <div>Job not found</div>;
  }

  return (
    <div className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-gray-100 dark:bg-gray-900`}>
      <main className="container mx-auto px-4 py-8">
        <Link href="/" className="text-blue-600 dark:text-blue-400 mb-4 inline-block">&larr; Back to listings</Link>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-100">{job.title}</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-2">{job.company}</p>
          <p className="text-gray-500 dark:text-gray-400 mb-4">{job.location} • {job.type}</p>
          
          <h2 className="text-2xl font-semibold mb-2 text-gray-800 dark:text-gray-100">Job Description</h2>
          <p className="text-gray-700 dark:text-gray-300">{job.description}</p>
          
          <button className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300">
            Apply Now
          </button>
        </div>
      </main>
    </div>
  );
}
