import { NextResponse } from 'next/server';
import { writeFile, readFile, mkdir } from 'fs/promises';
import { join } from 'path';

// Helper function to ensure directory exists
async function ensureDirectory(dirPath: string) {
  try {
    await mkdir(dirPath, { recursive: true });
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== 'EEXIST') {
      throw error;
    }
  }
}

// Helper function to get applications file path
function getApplicationsPath() {
  return join(process.cwd(), 'data', 'applications.json');
}

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

    const applicationsPath = getApplicationsPath();
    await ensureDirectory(join(process.cwd(), 'data'));

    // Read existing applications
    let applications = [];
    try {
      const existingData = await readFile(applicationsPath, 'utf8');
      applications = JSON.parse(existingData);
      if (!Array.isArray(applications)) {
        applications = [];
      }
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== 'ENOENT') {
        throw error;
      }
    }

    // Add new application
    applications.push(data);

    // Write back to file
    await writeFile(applicationsPath, JSON.stringify(applications, null, 2), 'utf8');

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

    const applicationsPath = getApplicationsPath();

    try {
      const data = await readFile(applicationsPath, 'utf8');
      const applications = JSON.parse(data);

      const application = Array.isArray(applications)
        ? applications.find((app) => app.job_id === parseInt(jobId))
        : null;

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
      if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
        return NextResponse.json(
          { message: 'Not Found', error: 'No saved application found' },
          { status: 404 }
        );
      }
      throw error;
    }
  } catch (error) {
    console.error('Error retrieving application data:', error);
    return NextResponse.json(
      { message: 'Error retrieving application data', error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
