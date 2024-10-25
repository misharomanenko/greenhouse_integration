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

