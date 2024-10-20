import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const API_URL = 'https://harvest.greenhouse.io/v1/candidates';
const API_KEY = process.env.GREENHOUSE_API_KEY;
const ON_BEHALF_OF = process.env.GREENHOUSE_USER_ID;

async function addCandidate(candidateData: any) {
  try {
    const response = await axios.post(API_URL, candidateData, {
      headers: {
        'Authorization': `Basic ${Buffer.from(API_KEY + ':').toString('base64')}`,
        'Content-Type': 'application/json',
        'On-Behalf-Of': ON_BEHALF_OF
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error adding candidate:', error);
    throw error;
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const candidateData = req.body;
    const result = await addCandidate(candidateData);
    res.status(200).json({ message: 'Candidate added successfully', data: result });
  } catch (error) {
    console.error('Error processing request:', error);
    res.status(500).json({ 
      message: 'Error adding candidate', 
      error: error instanceof Error ? error.message : String(error) 
    });
  }
}

