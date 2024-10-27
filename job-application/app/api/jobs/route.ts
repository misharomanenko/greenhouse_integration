import { NextResponse } from 'next/server';
import axios from 'axios';

// Define the types for our application data
interface Attachment {
  filename: string;
  type: string;
  content: string;
  content_type: string;
}

interface ApplicationData {
  job_id: number;
  attachments: Attachment[];
}

const GREENHOUSE_API_BASE_URL = 'https://harvest.greenhouse.io/v1/jobs';
const API_KEY = process.env.GREENHOUSE_API_KEY;

export async function GET(request: Request) {
  try {
    if (!API_KEY) {
      return NextResponse.json(
        { error: 'Greenhouse API key is not configured' },
        { status: 500 }
      );
    }

    // Get job ID from URL params
    const { searchParams } = new URL(request.url);
    const jobId = searchParams.get('jobId');

    if (!jobId) {
      return NextResponse.json(
        { error: 'Job ID is required' },
        { status: 400 }
      );
    }

    // Construct the full URL with the job ID
    const GREENHOUSE_API_URL = `${GREENHOUSE_API_BASE_URL}/${jobId}`;

    const headers = {
      'Authorization': `Basic ${Buffer.from(API_KEY + ':').toString('base64')}`,
      'Content-Type': 'application/json',
    };

    // Log the request details
    console.log('Greenhouse API Request:', {
      url: GREENHOUSE_API_URL,
      method: 'GET',
      headers
    });

    const response = await axios.get(GREENHOUSE_API_URL, { headers });
    
    // Log the response
    console.log('Greenhouse API Response:', {
      status: response.status,
      data: response.data
    });

    return NextResponse.json({ 
      message: 'Job details retrieved successfully', 
      data: response.data 
    });
  } catch (error) {
    console.error('Error fetching job details:', error);
    if (axios.isAxiosError(error)) {
      return NextResponse.json({ 
        error: error.response?.data?.message || 'Failed to fetch job details'
      }, { 
        status: error.response?.status || 500 
      });
    }
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { jobId, attachments } = body;

    if (!jobId) {
      return NextResponse.json(
        { message: 'Bad Request', error: 'Job ID is required' },
        { status: 400 }
      );
    }

    if (!attachments?.length) {
      return NextResponse.json(
        { message: 'Bad Request', error: 'At least one attachment is required' },
        { status: 400 }
      );
    }

    const data = {
      job_id: jobId,
      attachments: attachments.map((attachment: any) => ({
        filename: attachment.filename,
        type: attachment.type,
        content: attachment.content,
        content_type: attachment.content_type
      }))
    };

    try {
      const response = await axios.post('/greenhouse/candidates', data, {
        headers: {
          'Content-Type': 'application/json',
          // Authorization headers should be added here from environment variables
        }
      });
      
      return NextResponse.json({ 
        message: 'Application submitted successfully', 
        data: response.data 
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Axios error:', error.response?.data || error.message);
        if (error.response?.data?.errors?.[0]?.message === 'This candidate already has an active application on that job') {
          return NextResponse.json({ 
            message: 'Application already exists',
            error: 'You have already submitted an application for this job.'
          }, { status: 409 });
        } else {
          return NextResponse.json({ 
            message: 'Error submitting application to Greenhouse', 
            error: error.response?.data || error.message || 'Unknown error'
          }, { status: 500 });
        }
      }
      throw error;
    }
  } catch (error) {
    console.error('Error processing application:', error);
    return NextResponse.json({ 
      message: 'Error processing application', 
      error: error instanceof Error ? error.message : String(error) 
    }, { status: 500 });
  }
}

// Hook file should be separate
