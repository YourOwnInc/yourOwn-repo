import { apiClient } from './api';
import { User, RegisterBody, LoginBody, ApiResponse } from '../types';

/**
 * User service for API calls
 * All methods are currently commented out - uncomment when ready to integrate with backend
 */

export const userService = {
  /**
   * Register a new user
   * POST /api/users/register
   * 
   * TO INTEGRATE:
   * 1. Uncomment the method body
   * 2. Update UserContext to call this method after onboarding
   * 3. Handle the response and store user data
   */
  async register(data: RegisterBody): Promise<ApiResponse<User>> {
    // COMMENTED OUT FOR LOCAL DEVELOPMENT
    // Uncomment when ready:
    // return apiClient.post<User>('/users/register', data);
    
    // Stub for local development
    return Promise.resolve({
      error: {
        code: 'NOT_IMPLEMENTED',
        message: 'User registration not yet integrated. Using localStorage.',
      },
    });
  },

  /**
   * Login user
   * POST /api/users/login
   * 
   * TO INTEGRATE:
   * 1. Uncomment the method body
   * 2. Store the session token/cookie from response
   * 3. Update UserContext with user data
   */
  async login(data: LoginBody): Promise<ApiResponse<{ user: User; token?: string }>> {
    // COMMENTED OUT FOR LOCAL DEVELOPMENT
    // Uncomment when ready:
    // return apiClient.post<{ user: User; token?: string }>('/users/login', data);
    
    // Stub for local development
    return Promise.resolve({
      error: {
        code: 'NOT_IMPLEMENTED',
        message: 'User login not yet integrated. Using localStorage.',
      },
    });
  },

  /**
   * Get current user
   * GET /api/users/me
   * 
   * TO INTEGRATE:
   * 1. Uncomment the method body
   * 2. Add authentication header (token) to request
   * 3. Call this on app initialization to restore user session
   */
  async getCurrentUser(): Promise<ApiResponse<User>> {
    // COMMENTED OUT FOR LOCAL DEVELOPMENT
    // Uncomment when ready:
    // return apiClient.get<User>('/users/me');
    
    // Stub for local development
    return Promise.resolve({
      error: {
        code: 'NOT_IMPLEMENTED',
        message: 'Get current user not yet integrated. Using localStorage.',
      },
    });
  },
};

