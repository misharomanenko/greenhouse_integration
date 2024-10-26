import { NextResponse } from 'next/server';
import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function POST(req: Request) {
  try {
    const applicationData = await req.json();

    // Make the request to Greenhouse API
    try {
      const response = await axios.post(BASE_URL || '', applicationData, {
        headers: {
          'Authorization': `Basic ${Buffer.from(process.env.GREENHOUSE_API_KEY + ':').toString('base64')}`,
          'Content-Type': 'application/json',
          'On-Behalf-Of': process.env.GREENHOUSE_USER_ID
        }
      });
      
      return NextResponse.json({ 
        message: 'Application submitted successfully', 
        application: response.data 
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Greenhouse API error:', error.response?.data);
        return NextResponse.json({ 
          message: 'Error submitting to Greenhouse',
          error: error.response?.data?.errors?.[0]?.message || error.message
        }, { status: error.response?.status || 500 });
      }
      throw error;
    }
  } catch (error) {
    console.error('Error processing application:', error);
    return NextResponse.json(
      { 
        message: 'Error processing application',
        error: error instanceof Error ? error.message : String(error)
      }, 
      { status: 500 }
    );
  }
}
