import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import localFont from 'next/font/local';
import { FaBriefcase, FaMapMarkerAlt, FaClock, FaArrowLeft } from 'react-icons/fa';
import { jobListings } from '@/data/jobs';

const geistSans = localFont({
    src: '../../../public/fonts/GeistVF.woff',
    variable: '--font-geist-sans',
});

const geistMono = localFont({
    src: '../../../public/fonts/GeistMonoVF.woff',
    variable: '--font-geist-mono',
});

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  description: string;
}

export default function JobDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchJobDetails = () => {
      try {
        const jobId = parseInt(id as string, 10);
        const localJob = jobListings.find(job => job.id === jobId);
        if (localJob) {
          setJob(localJob);
        } else {
          throw new Error('Job not found');
        }
      } catch (error) {
        console.error('Error fetching job details:', error);
        setError('Failed to load job details');
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!job) return <div>Job not found</div>;

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <div className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 dark:from-neutral-900 dark:to-neutral-800 text-neutral-800 dark:text-neutral-200 flex items-center justify-center`}>
      <main className="container mx-auto px-4 py-12 max-w-3xl">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 border border-gray-200 dark:border-gray-700">
          <Link href="/" className="inline-flex items-center text-primary-600 dark:text-primary-400 mb-8 hover:underline transition duration-300">
            <FaArrowLeft className="mr-2" /> Back to listings
          </Link>
          
          <h1 className="text-4xl font-bold mb-4 text-blue-600 dark:text-blue-400">{job.title}</h1>
          <div className="flex flex-wrap justify-center items-center text-gray-600 dark:text-gray-300 mb-6">
            <p className="mr-6 mb-2 flex items-center">
              <FaBriefcase className="mr-2 text-gray-400" /> {job.company}
            </p>
            <p className="mr-6 mb-2 flex items-center">
              <FaMapMarkerAlt className="mr-2 text-gray-400" /> {job.location}
            </p>
            <p className="flex items-center">
              <FaClock className="mr-2 text-gray-400" /> {job.type}
            </p>
          </div>
          
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Job Description</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-8">{job.description}</p>
          
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Apply Now</h2>
          <form className="space-y-8">
            <div className="relative">
              <input type="text" id="name" name="name" placeholder="Name" className="w-full p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500" />
            </div>
            <div className="relative">
              <input type="email" id="email" name="email" placeholder="Email" className="w-full p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500" />
            </div>
            <div className="relative">
              <input type="url" id="linkedin" name="linkedin" placeholder="LinkedIn Profile" className="w-full p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500" />
            </div>
            <div className="relative">
              <input type="text" id="compensation" name="compensation" placeholder="Desired Compensation" className="w-full p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500" />
            </div>
            <div className="relative">
              <select id="remote" name="remote" className="w-full p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 appearance-none">
                <option value="">Remote Preferred</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
            <div className="relative">
              <input type="number" id="experience" name="experience" min="0" placeholder="Years of Experience" className="w-full p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500" />
            </div>
            <div>
              <label htmlFor="resume" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Resume</label>
              <div 
                className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md ${dragActive ? 'border-blue-400 bg-blue-50' : ''}`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <div className="space-y-1 text-center">
                  <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <div className="flex text-sm text-gray-600">
                    <label htmlFor="file-upload" className="relative cursor-pointer font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500">
                      <span>Upload a PDF</span>
                      <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleChange} />
                    </label>
                  </div>
                  <p className="text-xs text-gray-500">Up to 10MB</p>
                </div>
              </div>
              {file && <p className="mt-2 text-sm text-gray-500">File selected: {file.name}</p>}
            </div>
            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
              Submit Application
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
