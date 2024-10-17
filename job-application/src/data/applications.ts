import { jobListings } from './jobs';
import fs from 'fs';
import path from 'path';

export interface UserApplication {
  job_id: number;
  source_id: number;
  user_id: string;
  initial_stage_id: number;
  referrer: {
    type: string;
    value: number;
  };
  attachments: {
    filename: string;
    type: string;
    content: string;
    content_type: string;
  }[];
}

const applicationsPath = path.join(process.cwd(), 'src', 'data', 'applications.json');

export const userApplications: UserApplication[] = [];

export const addUserApplication = (application: UserApplication): void => {
    const applications = JSON.parse(fs.readFileSync(applicationsPath, 'utf-8'));
    applications.push(application);
    fs.writeFileSync(applicationsPath, JSON.stringify(applications, null, 2));
  };

export const getUserApplications = (userId: string): UserApplication[] => {
  const applications = JSON.parse(fs.readFileSync(applicationsPath, 'utf-8'));
  return applications.filter((app: UserApplication) => app.user_id === userId);
};
