import { NextApiHandler } from 'next';
import axios from 'axios';
import fs from 'fs/promises';
import path from 'path';
import { jobListings, JobListing } from '@/data/jobs';

const API_KEY = 'f06b2b153e016f8e7c3632627af56b1d-7'; 
const JOB_ID = '4285367007';

const GREENHOUSE_API_URL = `https://harvest.greenhouse.io/v1/jobs/${JOB_ID}`;

const fetchJobDetails = async () => {
  try {
    const response = await axios.get(GREENHOUSE_API_URL, {
      headers: {
        'Authorization': `Basic ${Buffer.from(API_KEY + ':').toString('base64')}`
      },
    });

    const jobData = response.data;
    
    // Save the JSON response to job_query.json in the src/data directory
    const filePath = path.join(process.cwd(), 'src', 'data', 'job_query.json');
    await fs.writeFile(filePath, JSON.stringify(jobData, null, 2));
    console.log('Job details saved to src/data/job_query.json');

  } catch (error) {
    console.error('Error fetching or saving job details:', error);
    if (axios.isAxiosError(error) && error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
    }
  }
}

const updateJobListings = async (jobData: any) => {
  const newJob: JobListing = {
    id: jobData.id,
    title: jobData.name,
    company: "Paraform",
    location: jobData.offices[0]?.name || "Unknown",
    type: "Full-time",
    description: "Cool Job"
  };

  const updatedJobListings = [
    newJob,
    ...jobListings.filter(job => job.id !== newJob.id)
  ];

  const jobsFilePath = path.join(process.cwd(), 'src', 'data', 'jobs.ts');
  const jobsFileContent = `
import { JobListing } from '@/data/jobs';

export const jobListings: JobListing[] = ${JSON.stringify(updatedJobListings, null, 2)};
`;

  await fs.writeFile(jobsFilePath, jobsFileContent);
  console.log('Job listings updated in src/data/jobs.ts');
}

const handler: NextApiHandler = async (req, res) => {
  await fetchJobDetails();
  const jobData = JSON.parse(await fs.readFile(path.join(process.cwd(), 'src', 'data', 'job_query.json'), 'utf-8'));
  await updateJobListings(jobData);
  res.status(200).json({ message: 'Job details fetched, saved, and listings updated' });
}

export default handler;

fetchJobDetails();
