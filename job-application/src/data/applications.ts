import { jobListings } from './jobs';
import fs from 'fs';
import path from 'path';

export interface UserApplication {
  userId: string;
  name: string;
  email: string;
  linkedIn: string;
  desiredCompensation: string;
  remotePreference: string;
  yearsOfExperience: number;
  resumeFileName: string;
  jobDetails: typeof jobListings[number];
  applicationDate: string;
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
  return applications.filter((app: UserApplication) => app.userId === userId);
};
