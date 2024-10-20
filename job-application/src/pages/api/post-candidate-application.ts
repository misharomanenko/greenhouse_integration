import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import fs from 'fs/promises';
import path from 'path';

const API_URL = 'https://harvest.greenhouse.io/v1/candidates/{id}/applications';
const API_KEY = process.env.GREENHOUSE_API_KEY;
const ON_BEHALF_OF = process.env.GREENHOUSE_ON_BEHALF_OF;
const ENABLE_POST_REQUEST = process.env.ENABLE_POST_REQUEST === 'true';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const applicationsPath = path.join(process.cwd(), 'src', 'data', 'applications.json');
    const fileContent = await fs.readFile(applicationsPath, 'utf-8');
    const applications = JSON.parse(fileContent);

    const candidateId = req.body.candidateId;
    if (!candidateId) {
      return res.status(400).json({ message: 'Candidate ID is required' });
    }

    const application = applications.find((app: any) => app.user_id === candidateId);
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

    if (ENABLE_POST_REQUEST) {
      const response = await axios.post(API_URL.replace('{id}', candidateId), data, {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
          'On-Behalf-Of': ON_BEHALF_OF
        }
      });
      res.status(200).json({ message: 'Application submitted successfully', data: response.data });
    } else {
      console.log('POST request disabled. Application data:', data);
      res.status(200).json({ message: 'Application submission simulated (POST request disabled)', data });
    }
  } catch (error) {
    console.error('Error submitting application:', error);
    res.status(500).json({ 
      message: 'Error submitting application', 
      error: error instanceof Error ? error.message : String(error) 
    });
  }
}
