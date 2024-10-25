import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs/promises';
import path from 'path';
import { UserApplication } from '@/data/applications';

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

      res.status(200).json({ message: 'Application submitted successfully', application: lastApplication });
    } catch (error) {
      console.error('Error submitting application:', error);
      res.status(500).json({ message: 'Error submitting application' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
