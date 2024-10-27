import axios, { AxiosError } from 'axios';

import { customLog } from '@/config/logger';

export class ApiError extends Error {
  public readonly statusCode: number;
  public readonly errorCode: string;

  constructor(
    message: string,
    statusCode: number,
    errorCode: string = 'UNKNOWN_ERROR'
  ) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.errorCode = errorCode;
  }

  public static fromAxiosError(error: unknown): ApiError {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        const { status, data } = axiosError.response;
        const errorCode = (data as { code: string })?.code || 'UNKNOWN_ERROR';
        return new ApiError(
          (data as { message: string }).message || 'An error occurred',
          status,
          errorCode
        );
      } else if (axiosError.request) {
        // The request was made but no response was received
        return new ApiError(
          'No response received from the server',
          500,
          'NO_RESPONSE'
        );
      } else {
        // Something happened in setting up the request that triggered an Error
        return new ApiError(
          'Error setting up the request',
          500,
          'REQUEST_SETUP_ERROR'
        );
      }
    } else {
      // Handle unknown errors
      return new ApiError('An unknown error occurred', 500, 'UNKNOWN_ERROR');
    }
  }
}

export const isApiError = (error: unknown): error is ApiError => {
  return error instanceof ApiError;
};

export const handleApiError = (error: ApiError) => {
  switch (error.statusCode) {
    case 400:
      customLog('Bad Request:', error.message, 'Error Code:', error.errorCode);
      break;
    case 401:
      customLog('Unauthorized:', error.message, 'Error Code:', error.errorCode);
      break;
    case 403:
      customLog('Forbidden:', error.message, 'Error Code:', error.errorCode);
      break;
    case 404:
      customLog('Not Found:', error.message, 'Error Code:', error.errorCode);
      break;
    case 409:
      customLog('Conflict:', error.message, 'Error Code:', error.errorCode);
      break;
    case 500:
      customLog(
        'Internal Server Error:',
        error.message,
        'Error Code:',
        error.errorCode
      );
      break;
    default:
      customLog(
        'Unknown API Error:',
        error.message,
        'Error Code:',
        error.errorCode
      );
      break;
  }
};
