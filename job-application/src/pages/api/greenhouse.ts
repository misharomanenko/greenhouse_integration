import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

const GREENHOUSE_API_BASE_URL = 'https://harvest.greenhouse.io/v1/jobs';
const GREENHOUSE_API_KEY = process.env.GREENHOUSE_API_KEY;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (!GREENHOUSE_API_KEY) {
    return res.status(500).json({ error: 'Greenhouse API key is not set' });
  }

  try {
    const response = await axios.get(`${GREENHOUSE_API_BASE_URL}/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${Buffer.from(GREENHOUSE_API_KEY).toString('base64')}`
      },
    });

    const jobData = response.data;
    
    // Transform the data to match our Job interface
    const transformedJob = {
      id: jobData.id,
      title: jobData.title,
      company: process.env.COMPANY_NAME || 'Your Company Name',
      location: jobData.location.name,
      type: jobData.metadata.find((m: any) => m.name === 'employment_type')?.value || 'Not specified',
      description: jobData.content,
    };

    res.status(200).json(transformedJob);
  } catch (error) {
    console.error('Error fetching job details:', error);
    res.status(500).json({ error: 'Failed to fetch job details from Greenhouse API' });
  }
}
