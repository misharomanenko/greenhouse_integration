import axios from 'axios';
import { useCallback } from 'react';

interface Attachment {
  filename: string;
  type: string;
  content: string;
  content_type: string;
}

interface ApplicationData {
  job_id: number;
  attachments: Attachment[];
}

export const useJobApi = () => {
  const saveApplication = async (jobId: string, applicationData: any) => {
    if (!applicationData.resume?.file || !applicationData.resume?.content) {
      throw new Error('Resume is required to save');
    }

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
      const response = await axios.post('/api/jobs', data);
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
      const response = await axios.get(`/api/jobs?jobId=${jobId}`);
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
    const requestBody = {
      jobId,
      attachments: [{
        filename: applicationData.resume.file.name,
        type: 'resume',
        content: applicationData.resume.content,
        content_type: applicationData.resume.file.type
      }]
    };

    try {
      const response = await axios.post('/api/jobs', requestBody);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('API error:', error.response?.data);
        throw new Error(error.response?.data?.error || error.message);
      }
      throw error;
    }
  };

  // Memoize getJobDetails
  const getJobDetails = useCallback(async (jobId: string) => {
    try {
      const response = await axios.get(`/api/greenhouse/jobs?id=${jobId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching job details:', error);
      throw error;
    }
  }, []); // Empty dependency array since it doesn't depend on any props or state

  return { 
    getJobDetails,
    submitApplication, 
    saveApplication, 
    loadSavedApplication 
  };
};
