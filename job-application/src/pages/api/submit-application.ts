import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs/promises';
import path from 'path';
import { UserApplication } from '@/types/UserApplication';
import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const application: UserApplication = req.body;
      const applicationsPath = path.join(process.cwd(), 'src', 'data', 'applications.json');
      
      let applications: UserApplication[] = [];
      try {
        const fileContent = await fs.readFile(applicationsPath, 'utf-8');
        applications = JSON.parse(fileContent);
      } catch (error) {
        // If the file doesn't exist or is empty, we'll start with an empty array
      }

      applications.push(application);
      await fs.writeFile(applicationsPath, JSON.stringify(applications, null, 2));

      // Read the last application from the array
      const lastApplication = applications[applications.length - 1];

      // Call the post-candidate-application API
      try {
        const response = await axios.post(`${BASE_URL}/api/greenhouse-api/post-candidate-application`, lastApplication);
        res.status(200).json({ 
          message: 'Application submitted successfully to local storage and Greenhouse', 
          application: lastApplication,
          greenhouseResponse: response.data
        });
      } catch (error) {
        console.error('Error submitting application to Greenhouse:', error);
        if (axios.isAxiosError(error)) {
          console.error('Axios error details:', error.response?.data);
          res.status(error.response?.status || 500).json({ 
            message: 'Application saved locally but failed to submit to Greenhouse',
            application: lastApplication,
            error: error.response?.data || error.message
          });
        } else {
          res.status(500).json({ 
            message: 'Application saved locally but failed to submit to Greenhouse',
            application: lastApplication,
            error: error instanceof Error ? error.message : String(error)
          });
        }
      }
    } catch (error) {
      console.error('Error submitting application:', error instanceof Error ? error.message : String(error));
      res.status(500).json({ message: 'Error submitting application' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
