import { ApiResponse } from '../types';

// Base API URL - Currently commented for local development
// When ready to integrate with backend, uncomment and set to your backend URL
// const API_BASE_URL = 'http://localhost:5000/api';

// For now, we'll use a placeholder that won't make actual requests
const API_BASE_URL = '/api'; // This will use Vite proxy when uncommented

/**
 * Base API client with error handling
 * Currently all methods are stubbed - uncomment when ready to integrate
 */
class ApiClient {
  private baseURL: string;

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    // COMMENTED OUT FOR LOCAL DEVELOPMENT
    // Uncomment when ready to integrate with backend:
    /*
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({ message: 'Unknown error' }));
        return { error: { code: 'HTTP_ERROR', message: error.message || 'Request failed' } };
      }

      const data = await response.json();
      return { data };
    } catch (error) {
      return {
        error: {
          code: 'NETWORK_ERROR',
          message: error instanceof Error ? error.message : 'Network request failed',
        },
      };
    }
    */

    // Stub response for local development
    return Promise.resolve({
      error: {
        code: 'NOT_IMPLEMENTED',
        message: 'API integration not yet enabled. Using localStorage for now.',
      },
    });
  }

  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  async post<T>(endpoint: string, body?: unknown): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  async put<T>(endpoint: string, body?: unknown): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  async patch<T>(endpoint: string, body?: unknown): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }
}

export const apiClient = new ApiClient();

