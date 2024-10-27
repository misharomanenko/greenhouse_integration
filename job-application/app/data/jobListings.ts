export interface JobListing {
    id: string;
    title: string;
    company: string;
    location: string;
    type: string;
    description: string;
  }
  
export const jobListings: JobListing[] = [
    {
      "id": "4285367007", 
      "title": "Founding Software Engineer",
      "company": "Paraform",
      "location": "San Francisco",
      "type": "Full-time",
      "description": "Join us as a founding engineer to help build the future of our platform from the ground up. You'll have the opportunity to make key technical decisions, architect scalable solutions, and have massive impact as one of our first engineering hires."
    },
    {
      "id": "2",
      "title": "Senior Backend Engineer",
      "company": "DataSystems", 
      "location": "New York, NY",
      "type": "Full-time",
      "description": "Lead the development of our next-generation distributed systems and APIs. You'll architect high-performance microservices, optimize database performance, and mentor junior engineers while working with cutting-edge technologies like Node.js, PostgreSQL, and Redis."
    },
    {
      "id": "3",
      "title": "Senior Product Designer",
      "company": "DesignHub",
      "location": "San Francisco, CA", 
      "type": "Contract",
      "description": "Shape the future of digital products by creating beautiful, intuitive experiences that delight users. You'll lead end-to-end design processes, conduct user research, create pixel-perfect interfaces, and collaborate closely with engineering teams to bring your designs to life."
    },
    {
      "id": "4",
      "title": "Senior DevOps Engineer",
      "company": "CloudOps",
      "location": "Remote",
      "type": "Part-time",
      "description": "Architect and maintain our cloud infrastructure using cutting-edge technologies. You'll implement CI/CD pipelines, manage Kubernetes clusters, optimize cloud costs, and ensure 99.99% uptime across our AWS infrastructure while championing DevOps best practices."
    },
    {
      "id": "5",
      "title": "Lead Data Scientist",
      "company": "AI Innovations",
      "location": "Boston, MA",
      "type": "Full-time",
      "description": "Drive innovation in machine learning and AI as you lead a team of data scientists. You'll develop sophisticated ML models, conduct advanced statistical analysis, and translate complex business problems into elegant data science solutions using Python, TensorFlow, and other cutting-edge ML tools."
    }
  ];