import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import applications from '@/app/data/applications.json';

// Add function to write to JSON file

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const { jobId, attachments } = req.body;

    if (!jobId) {
      return res.status(400).json({ 
        message: 'Bad Request', 
        error: 'Job ID is required' 
      });
    }

    if (!attachments?.length) {
      return res.status(400).json({ 
        message: 'Bad Request', 
        error: 'At least one attachment is required' 
      });
    }

    const data = {
      job_id: jobId,
      attachments: attachments.map((attachment: any) => ({
        filename: attachment.filename,
        type: attachment.type,
        content: attachment.content,
        content_type: attachment.content_type
      }))
    };

    try {
      const response = await axios.post('/greenhouse/candidates', data, {
        headers: {
          'Content-Type': 'application/json',
          // Move authorization headers to the backend if possible
        }
      });
      
      res.status(200).json({ 
        message: 'Application submitted successfully', 
        data: response.data 
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Axios error:', error.response?.data || error.message);
        if (error.response?.data?.errors?.[0]?.message === 'This candidate already has an active application on that job') {
          res.status(409).json({ 
            message: 'Application already exists',
            error: 'You have already submitted an application for this job.'
          });
        } else {
          res.status(500).json({ 
            message: 'Error submitting application to Greenhouse', 
            error: error.response?.data || error.message || 'Unknown error'
          });
        }
      }
    }
  } catch (error) {
    console.error('Error processing application:', error);
    res.status(500).json({ 
      message: 'Error processing application', 
      error: error instanceof Error ? error.message : String(error) 
    });
  }
}

// Define the types for our application data
interface Attachment {
  filename: string;
  type: string;
  content: string;
  content_type: string;
}

interface ApplicationData {
  job_id: any;
  attachments: Attachment[];
}

// Application submission hook
export const useApplicationSubmission = () => {
  const saveApplication = async (jobId: string, applicationData: any) => {
    // Make sure we have the resume data
    if (!applicationData.resume?.file || !applicationData.resume?.content) {
      throw new Error('Resume is required to save');
    }

    // Format the data properly for the API
    const data: ApplicationData = {
      job_id: parseInt(jobId),
      attachments: [{
        filename: applicationData.resume.file.name,
        type: 'resume',
        content: applicationData.resume.content,
        content_type: applicationData.resume.file.type
      }]
    };

    try {
      // Save to API
      const response = await axios.post('/api/applications/save', data);
      if (!response.data) {
        throw new Error('Failed to save application');
      }
      return true;
    } catch (error) {
      console.error('Error saving application data:', error);
      throw error;
    }
  };

  const loadSavedApplication = async (jobId: string) => {
    try {
      const response = await axios.get(`/api/applications/save?jobId=${jobId}`);
      if (response.data?.data) {
        return response.data.data;
      }
      return null;
    } catch (error) {
      console.error('Error loading saved application:', error);
      return null;
    }
  };

  const submitApplication = async (jobId: string, applicationData: any) => {
    // Format the request body
    const requestBody = {
      user_id: (applications as any)[0].user_id,
      job_id: parseInt(jobId),
      attachments: (applications as any)[0].attachments.map((attachment: any) => ({
        filename: attachment.filename,
        type: attachment.type,
        content: attachment.content,
        content_type: attachment.content_type
      }))
    };

    try {
      // Instead of calling Greenhouse directly, call our Next.js API route
      const response = await axios.post('/api/greenhouse/candidates/applications', requestBody);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('API error:', error.response?.data);
        throw new Error(error.response?.data?.error || error.message);
      }
      throw error;
    }
  };

  return { submitApplication, saveApplication, loadSavedApplication };
};
