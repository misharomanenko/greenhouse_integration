export interface JobListing {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  description: string;
}

export interface Job {
  id: string | number;
  title: string;
  company: string;
  location: string;
  type: string;
  description: string;
}
