import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import fs from 'fs/promises';
import path from 'path';

// const API_URL = `https://harvest.greenhouse.io/v1/candidates/${process.env.CANDIDATE_ID}/applications`;
const API_URL = 'https://harvest.greenhouse.io/v1/candidates/34555007007/applications';

// const API_KEY = process.env.GREENHOUSE_API_KEY?.toString();
const API_KEY = 'f06b2b153e016f8e7c3632627af56b1d-7'; 

// const ON_BEHALF_OF = process.env.GREENHOUSE_USER_ID?.toString();
const ON_BEHALF_OF = '4280249007'; 

const ENABLE_POST_REQUEST = process.env.ENABLE_POST_REQUEST === 'true';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const applicationsPath = path.join(process.cwd(), 'src', 'data', 'applications.json');
    const fileContent = await fs.readFile(applicationsPath, 'utf-8');
    const applications = JSON.parse(fileContent);

    // Always use the last application in the array
    const application = applications[applications.length - 1];

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    const data = {
      job_id: application.job_id,
      source_id: application.source_id,
      initial_stage_id: application.initial_stage_id,
      referrer: application.referrer,
      attachments: application.attachments
    };

    const test_headers = {
      'Authorization': `Basic ${Buffer.from(API_KEY + ':').toString('base64')}`,
      'Content-Type': 'application/json',
      'On-Behalf-Of': ON_BEHALF_OF
    }
    
    console.log(API_URL.replace('{id}', application.user_id));
    console.log('test_headers', test_headers);
    console.log('data', data);

    if (ENABLE_POST_REQUEST) {
      try {
        const response = await axios.post(API_URL.replace('{id}', application.user_id), data, {
          headers: {
            'Authorization': `Basic ${Buffer.from(API_KEY + ':').toString('base64')}`,
            'Content-Type': 'application/json',
            'On-Behalf-Of': ON_BEHALF_OF
          }
        });
        res.status(200).json({ message: 'Application submitted successfully', data: response.data });
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
    } else {
      console.log('POST request disabled. Application data:', data);
      res.status(200).json({ message: 'Application submission simulated (POST request disabled)', data });
    }
  } catch (error) {
    console.error('Error processing application:', error);
    res.status(500).json({ 
      message: 'Error processing application', 
      error: error instanceof Error ? error.message : String(error) 
    });
  }
}
