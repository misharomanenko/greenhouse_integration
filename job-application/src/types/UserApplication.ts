export interface UserApplication {
  user_id: string;
  job_id: number;
  attachments: {
    filename: string;
    type: string;
    content: string;
    content_type: string;
  }[];
}

export const userApplications: UserApplication[] = [];

export const addUserApplication = async (application: UserApplication): Promise<void> => {
  if (typeof window === 'undefined') {
    // Server-side code
    const fs = await import('fs/promises');
    const path = await import('path');
    const applicationsPath = path.default.join(process.cwd(), 'src', 'data', 'applications.json');
    const applications = [application];
    await fs.default.writeFile(applicationsPath, JSON.stringify(applications, null, 2));
  } else {
    // Client-side code
    console.log('Application submitted:', application);
  }
};

export const getUserApplications = async (userId: string): Promise<UserApplication[]> => {
  if (typeof window === 'undefined') {
    // Server-side code
    const fs = await import('fs/promises');
    const path = await import('path');
    const applicationsPath = path.default.join(process.cwd(), 'src', 'data', 'applications.json');
    const fileContent = await fs.default.readFile(applicationsPath, 'utf-8');
    const applications = JSON.parse(fileContent);
    return applications.filter((app: UserApplication) => app.user_id === userId);
  } else {
    // Client-side code
    return [];
  }
};