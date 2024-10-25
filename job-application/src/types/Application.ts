import { jobListings } from '../data/jobs';
import fs from 'fs';
import path from 'path';
import { UserApplication } from '@/types/UserApplication';

const applicationsPath = path.join(process.cwd(), 'src', 'data', 'applications.json');

export const userApplications: UserApplication[] = [];

export const addUserApplication = (application: UserApplication): void => {
  const applications = [application]; // Create a new array with only the new application
  fs.writeFileSync(applicationsPath, JSON.stringify(applications, null, 2));
};

export const getUserApplications = (userId: string): UserApplication[] => {
  const applications = JSON.parse(fs.readFileSync(applicationsPath, 'utf-8'));
  return applications.filter((app: UserApplication) => app.user_id === userId);
};
