import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import localFont from 'next/font/local';
import { FaBriefcase, FaMapMarkerAlt, FaClock, FaArrowLeft } from 'react-icons/fa';
import { jobListings } from '@/data/jobs';
import { addUserApplication, UserApplication } from '@/data/applications';
import { currentUser } from '@/data/user';

const geistSans = localFont({
    src: '../../../public/fonts/GeistVF.woff',
    variable: '--font-geist-sans',
});

const geistMono = localFont({
    src: '../../../public/fonts/GeistMonoVF.woff',
    variable: '--font-geist-mono',
});

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  description: string;
}

const SubmissionPopup = ({ onClose }: { onClose: () => void }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white dark:bg-neutral-800 rounded-lg p-8 max-w-md w-full shadow-xl transform transition-all duration-300 scale-100">
      <h2 className="text-2xl font-bold mb-4 text-primary-600 dark:text-primary-400">Application Submitted!</h2>
      <p className="text-gray-700 dark:text-gray-300 mb-6">Thank you for your application. We'll be in touch soon!</p>
      <button 
        onClick={onClose}
        className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50"
      >
        Close
      </button>
    </div>
  </div>
);

export default function JobDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchJobDetails = async () => {
      try {
        const jobId = id as string;
        
        // First, try to find the job in local listings
        const localJob = jobListings.find(job => job.id.toString() === jobId);
        
        if (localJob) {
          setJob(localJob);
        } else {
          // If not found locally, fetch from Greenhouse API
          const response = await fetch(`/api/greenhouse/${jobId}`);
          if (!response.ok) {
            throw new Error('Failed to fetch job details');
          }
          const data = await response.json();
          setJob(data);
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!job) return;

    const formData = new FormData(e.currentTarget);
    
    const application: UserApplication = {
      user_id: currentUser.userId,
      job_id: parseInt(job.id),
      source_id: 7,
      initial_stage_id: 2708728,
      referrer: {
        type: "id",
        value: 770
      },
      attachments: []
    };

    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64String = reader.result as string;
        application.attachments.push({
          filename: file.name,
          type: "resume",
          content: base64String.split(',')[1],
          content_type: file.type
        });

        try {
          const response = await fetch('/api/submit-application', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(application),
          });

          if (response.ok) {
            setShowPopup(true);
          } else {
            throw new Error('Failed to submit application');
          }
        } catch (error) {
          console.error('Error submitting application:', error);
          alert('Failed to submit application. Please try again.');
        }
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please upload a resume file.');
    }
  };

  return (
    <div className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 dark:from-neutral-900 dark:to-neutral-800 text-neutral-800 dark:text-neutral-200 flex items-center justify-center`}>
      <main className="container mx-auto px-4 py-12 max-w-3xl">
        <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-xl p-8 border border-gray-200 dark:border-gray-700">
          <Link href="/" className="inline-flex items-center text-primary-600 dark:text-primary-400 mb-8 hover:underline transition duration-300">
            <FaArrowLeft className="mr-2" /> Back to listings
          </Link>
          
          <h1 className="text-4xl font-bold mb-4 text-white dark:text-white text-center">{job.title}</h1>
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
          
          <h2 className="font-semibold mb-4 text-gray-800 dark:text-gray-200 inline-block mr-2">Description:</h2>
          <p className="text-gray-700 dark:text-gray-300 inline">{job.description}</p>
          
          <form className="space-y-8" onSubmit={handleSubmit}>
            <div className="relative">
              <input type="text" id="name" name="name" placeholder="Name" className="w-full p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-black placeholder-gray-400 bg-gray-200" />
            </div>
            <div className="relative">
              <input type="email" id="email" name="email" placeholder="Email" className="w-full p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-black placeholder-gray-400 bg-gray-200" />
            </div>
            <div className="relative">
              <input type="url" id="linkedin" name="linkedin" placeholder="LinkedIn Profile" className="w-full p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-black placeholder-gray-400 bg-gray-200" />
            </div>
            <div className="relative">
              <input type="text" id="compensation" name="compensation" placeholder="Desired Compensation" className="w-full p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-black placeholder-gray-400 bg-gray-200" />
            </div>
            <div className="relative">
              <select id="remote" name="remote" className="w-full p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 appearance-none text-black bg-gray-200">
                <option value="" disabled selected className="text-gray-400">Remote Preferred</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
            <div className="relative">
              <input type="number" id="experience" name="experience" min="0" placeholder="Years of Experience" className="w-full p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-black placeholder-gray-400 bg-gray-200" />
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
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28M8 32l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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
      {showPopup && <SubmissionPopup onClose={() => {
        setShowPopup(false);
        router.push('/');
      }} />}
    </div>
  );
}
