import { apiClient } from './api';
import { Session, StartSessionBody, SaveSessionBody, ApiResponse } from '../types';

/**
 * Session service for API calls
 * All methods are currently commented out - uncomment when ready to integrate with backend
 */

export const sessionService = {
  /**
   * Start a new session (anonymous or linked to user)
   * POST /api/sessions/start
   * 
   * TO INTEGRATE:
   * 1. Uncomment the method body
   * 2. Call this after onboarding to create a session
   * 3. Store session ID in UserContext
   */
  async startSession(data: StartSessionBody): Promise<ApiResponse<Session>> {
    // COMMENTED OUT FOR LOCAL DEVELOPMENT
    // Uncomment when ready:
    // return apiClient.post<Session>('/sessions/start', data);
    
    // Stub for local development
    return Promise.resolve({
      error: {
        code: 'NOT_IMPLEMENTED',
        message: 'Start session not yet integrated. Using localStorage.',
      },
    });
  },

  /**
   * Get session by ID
   * GET /api/sessions/:id
   * 
   * TO INTEGRATE:
   * 1. Uncomment the method body
   * 2. Call this on app initialization to restore session
   * 3. Load portfolio entries from session
   */
  async getSession(id: string): Promise<ApiResponse<Session>> {
    // COMMENTED OUT FOR LOCAL DEVELOPMENT
    // Uncomment when ready:
    // return apiClient.get<Session>(`/sessions/${id}`);
    
    // Stub for local development
    return Promise.resolve({
      error: {
        code: 'NOT_IMPLEMENTED',
        message: 'Get session not yet integrated. Using localStorage.',
      },
    });
  },

  /**
   * Save/update session
   * PUT /api/sessions/save/:id
   * 
   * TO INTEGRATE:
   * 1. Uncomment the method body
   * 2. Call this periodically to auto-save portfolio
   * 3. Call this when user makes changes
   */
  async saveSession(id: string, data: SaveSessionBody): Promise<ApiResponse<Session>> {
    // COMMENTED OUT FOR LOCAL DEVELOPMENT
    // Uncomment when ready:
    // return apiClient.put<Session>(`/sessions/save/${id}`, data);
    
    // Stub for local development
    return Promise.resolve({
      error: {
        code: 'NOT_IMPLEMENTED',
        message: 'Save session not yet integrated. Using localStorage.',
      },
    });
  },

  /**
   * Link session to user (or create user)
   * POST /api/sessions/link/:userId
   * 
   * TO INTEGRATE:
   * 1. Uncomment the method body
   * 2. Call this after user registration/login
   * 3. Associate anonymous session with user account
   */
  async linkSessionToUser(
    sessionId: string,
    userId: string,
    email: string,
    password: string,
    createIfMissing: boolean = true
  ): Promise<ApiResponse<Session>> {
    // COMMENTED OUT FOR LOCAL DEVELOPMENT
    // Uncomment when ready:
    // return apiClient.post<Session>(`/sessions/link/${userId}`, {
    //   userId,
    //   email,
    //   password,
    //   createIfMissing,
    // });
    
    // Stub for local development
    return Promise.resolve({
      error: {
        code: 'NOT_IMPLEMENTED',
        message: 'Link session to user not yet integrated. Using localStorage.',
      },
    });
  },
};

