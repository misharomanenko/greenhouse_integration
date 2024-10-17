export interface JobListing {
    id: number;
    title: string;
    company: string;
    location: string;
    type: string;
    description: string;
  }
  
  export const jobListings: JobListing[] = [
    {
      id: 4285367007,
      title: 'Frontend Developer',
      company: 'TechCorp',
      location: 'Remote',
      type: 'Full-time',
      description: 'We are seeking a skilled Frontend Developer to join our team and create responsive web applications using React and Next.js.'
    },
    {
      id: 2,
      title: 'Backend Engineer',
      company: 'DataSystems',
      location: 'New York, NY',
      type: 'Full-time',
      description: 'Join our backend team to develop scalable APIs and microservices using Node.js and PostgreSQL.'
    },
    {
      id: 3,
      title: 'UX Designer',
      company: 'DesignHub',
      location: 'San Francisco, CA',
      type: 'Contract',
      description: 'We are looking for a talented UX Designer to create intuitive and visually appealing user interfaces for our clients.',
    },
    {
      id: 4,
      title: 'DevOps Specialist',
      company: 'CloudOps',
      location: 'Remote',
      type: 'Part-time',
      description: 'Help us streamline our deployment processes and manage cloud infrastructure using AWS and Kubernetes.'
    },
    {
      id: 5,
      title: 'Data Scientist',
      company: 'AI Innovations',
      location: 'Boston, MA',
      type: 'Full-time',
      description: 'Join our data science team to develop machine learning models and analyze large datasets using Python and TensorFlow.'
    }
  ];
