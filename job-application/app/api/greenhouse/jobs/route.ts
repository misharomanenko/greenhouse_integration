import { NextResponse } from 'next/server';

// Remove the hardcoded ID and create a base URL
const GREENHOUSE_API_BASE_URL = 'https://harvest.greenhouse.io/v1/jobs';
const API_KEY = process.env.GREENHOUSE_API_KEY;
const ON_BEHALF_OF = process.env.GREENHOUSE_USER_ID;

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
    const jobId = searchParams.get('id');

    if (!jobId) {
      return NextResponse.json(
        { error: 'Job ID is required' },
        { status: 400 }
      );
    }

    // Construct the full URL with the job ID
    const GREENHOUSE_API_URL = `${GREENHOUSE_API_BASE_URL}/${jobId}`;

    const headers = new Headers({
      'Authorization': `Basic ${Buffer.from(API_KEY + ':').toString('base64')}`,
      'Content-Type': 'application/json',
    });

    // Log the request details
    console.log('Greenhouse API Request:', {
      url: GREENHOUSE_API_URL,
      method: 'GET',
      headers: Object.fromEntries(headers.entries())
    });

    const response = await fetch(GREENHOUSE_API_URL, {
      method: 'GET',
      headers
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch job details' },
        { status: response.status }
      );
    }

    const data = await response.json();
    
    // Log the response
    console.log('Greenhouse API Response:', {
      status: response.status,
      data: data
    });

    // Wrap the response in the expected format
    return NextResponse.json({
      message: "Job details retrieved successfully",
      data: data
    });
  } catch (error) {
    console.error('Error fetching job details:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
