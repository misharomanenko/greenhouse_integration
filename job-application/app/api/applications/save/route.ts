import { NextResponse } from 'next/server';

// In-memory storage for development purposes
// In production, this should be replaced with a proper database
let applications: any[] = [];

export async function POST(req: Request) {
  try {
    const data = await req.json();

    if (!data.job_id) {
      return NextResponse.json(
        { message: 'Bad Request', error: 'Job ID is required' },
        { status: 400 }
      );
    }

    if (!data.attachments?.length) {
      return NextResponse.json(
        { message: 'Bad Request', error: 'At least one attachment is required' },
        { status: 400 }
      );
    }

    // Add new application to in-memory storage
    applications.push(data);

    return NextResponse.json({ 
      message: 'Application saved successfully', 
      data: data 
    });
  } catch (error) {
    console.error('Error saving application data:', error);
    return NextResponse.json(
      { message: 'Error saving application data', error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const jobId = searchParams.get('jobId');

    if (!jobId) {
      return NextResponse.json(
        { message: 'Bad Request', error: 'Job ID is required' },
        { status: 400 }
      );
    }

    const application = applications.find(
      (app) => app.job_id === parseInt(jobId)
    );

    if (!application) {
      return NextResponse.json(
        { message: 'Not Found', error: 'No saved application found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: 'Application retrieved successfully',
      data: application
    });
  } catch (error) {
    console.error('Error retrieving application data:', error);
    return NextResponse.json(
      { message: 'Error retrieving application data', error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
