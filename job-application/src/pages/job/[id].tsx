import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaBriefcase, FaMapMarkerAlt, FaClock, FaArrowLeft, FaUpload } from 'react-icons/fa';
import { jobListings } from '@/types/jobs';
import { addUserApplication } from '@/types/Application';
import { currentUser } from '@/types/user';
import { Job } from '@/types/job';
import { UserApplication } from '@/types/UserApplication';
import { theme } from '@/styles/theme';

const SubmissionPopup = ({ onClose, message, isError }: { onClose: () => void, message: string, isError: boolean }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white dark:bg-neutral-800 rounded-lg p-8 max-w-md w-full shadow-xl transform transition-all duration-300 scale-100">
      <h2 className="text-2xl font-bold mb-4 text-primary-600 dark:text-primary-400">Application Status</h2>
      <p className="text-neutral-700 dark:text-neutral-300 mb-6">{message}</p>
      <button 
        onClick={onClose}
        className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50"
      >
        {isError ? 'Close' : 'Back to Listings'}
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
  const [selectedOption, setSelectedOption] = useState('');
  const [popupMessage, setPopupMessage] = useState('');

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
      user_id: currentUser.id.toString(),
      job_id: parseInt(job.id.toString()),
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
          // Submit application to local storage/database
          const response = await fetch('/api/submit-application', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(application),
          });

          if (response.ok) {
            // If local submission is successful, submit to Greenhouse
            await submitApplication(currentUser.id.toString());
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

  const submitApplication = async (candidateId: string) => {
    try {
      const response = await fetch('/api/greenhouse-api/post-candidate-application', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ candidateId }),
      });

      const result = await response.json();

      if (!response.ok) {
        if (response.status === 409) {
          setShowPopup(true);
          setPopupMessage('You have already submitted an application for this job.');
        } else {
          throw new Error(result.error || 'Failed to submit application to Greenhouse');
        }
      } else {
        console.log('Application submitted to Greenhouse:', result);
        setShowPopup(true);
        setPopupMessage('Application submitted successfully!');
      }
    } catch (error) {
      console.error('Error submitting application to Greenhouse:', error);
      setShowPopup(true);
      setPopupMessage('An error occurred while submitting your application. Please try again later.');
    }
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800 text-neutral-800 dark:text-neutral-200 pt-20">
      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <Link href="/" className="inline-flex items-center text-primary-600 dark:text-primary-400 mb-8 hover:underline transition duration-300">
          <FaArrowLeft className="mr-2" /> Back to listings
        </Link>
        
        <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-xl p-8 border border-neutral-200 dark:border-neutral-700">
          <h1 className="text-4xl font-bold mb-4 text-primary-600 dark:text-primary-400">{job.title}</h1>
          <div className="flex flex-wrap items-center text-neutral-600 dark:text-neutral-400 mb-6 space-x-6">
            <p className="flex items-center"><FaBriefcase className="mr-2" /> {job.company}</p>
            <p className="flex items-center"><FaMapMarkerAlt className="mr-2" /> {job.location}</p>
            <p className="flex items-center"><FaClock className="mr-2" /> {job.type}</p>
          </div>
          
          <h2 className={`text-2xl font-semibold mb-4 ${theme.text.primary.light} ${theme.text.primary.dark}`}>Description</h2>
          <p className={`${theme.text.body.light} ${theme.text.body.dark} mb-8`}>{job.description}</p>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input 
                type="text" 
                id="name" 
                name="name" 
                placeholder="Name" 
                className={`w-full p-3 rounded-md ${theme.input.border.light} ${theme.input.border.dark} ${theme.input.background.light} ${theme.input.background.dark} ${theme.input.text.light} ${theme.input.text.dark} ${theme.input.placeholder.light} ${theme.input.placeholder.dark} ${theme.input.focus} ${theme.input.shadow} ${theme.input.hover}`} 
              />
              <input 
                type="email" 
                id="email" 
                name="email" 
                placeholder="Email" 
                className={`w-full p-3 rounded-md ${theme.input.border.light} ${theme.input.border.dark} ${theme.input.background.light} ${theme.input.background.dark} ${theme.input.text.light} ${theme.input.text.dark} ${theme.input.placeholder.light} ${theme.input.placeholder.dark} ${theme.input.focus} ${theme.input.shadow} ${theme.input.hover}`} 
              />
            </div>
            <input 
              type="url" 
              id="linkedin" 
              name="linkedin" 
              placeholder="LinkedIn Profile" 
              className={`w-full p-3 rounded-md ${theme.input.border.light} ${theme.input.border.dark} ${theme.input.background.light} ${theme.input.background.dark} ${theme.input.text.light} ${theme.input.text.dark} ${theme.input.placeholder.light} ${theme.input.placeholder.dark} ${theme.input.focus} ${theme.input.shadow} ${theme.input.hover}`} 
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input 
                type="text" 
                id="compensation" 
                name="compensation" 
                placeholder="Desired Compensation" 
                className={`w-full p-3 rounded-md ${theme.input.border.light} ${theme.input.border.dark} ${theme.input.background.light} ${theme.input.background.dark} ${theme.input.text.light} ${theme.input.text.dark} ${theme.input.placeholder.light} ${theme.input.placeholder.dark} ${theme.input.focus} ${theme.input.shadow} ${theme.input.hover}`} 
              />
              <select 
                id="remote" 
                name="remote" 
                value={selectedOption} 
                onChange={handleSelectChange} 
                className={`w-full p-3 rounded-md ${theme.input.border.light} ${theme.input.border.dark} ${theme.input.background.light} ${theme.input.background.dark} ${theme.input.text.light} ${theme.input.text.dark} ${theme.input.focus} ${theme.input.shadow} ${theme.input.hover}`}
              >
                <option value="" disabled>Remote Preferred</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
            <input 
              type="number" 
              id="experience" 
              name="experience" 
              min="0" 
              placeholder="Years of Experience" 
              className={`w-full p-3 rounded-md ${theme.input.border.light} ${theme.input.border.dark} ${theme.input.background.light} ${theme.input.background.dark} ${theme.input.text.light} ${theme.input.text.dark} ${theme.input.placeholder.light} ${theme.input.placeholder.dark} ${theme.input.focus} ${theme.input.shadow} ${theme.input.hover}`} 
            />
            <div 
              className={`mt-4 border-2 border-dashed rounded-md p-6 ${dragActive ? 'border-primary-400 bg-primary-50 dark:bg-primary-900' : 'border-neutral-300 dark:border-neutral-600'}`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <div className="text-center">
                <FaUpload className="mx-auto h-12 w-12 text-neutral-400" />
                <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">Drag and drop your resume here, or click to select a file</p>
                <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleChange} />
              </div>
            </div>
            {file && <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">File selected: {file.name}</p>}
            <button type="submit" className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50">
              Submit Application
            </button>
          </form>
        </div>
      </main>
      {showPopup && <SubmissionPopup 
        message={popupMessage}
        isError={popupMessage !== 'Application submitted successfully!'}
        onClose={() => {
          setShowPopup(false);
          router.push('/');
        }} 
      />}
    </div>
  );
}
