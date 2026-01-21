import { apiClient } from '../../services/api';
import { Session, StartSessionBody, SaveSessionBody, ApiResponse } from '../../shared/types';
import { useUser } from './UserContext';

/**
 * Session service for API calls
 * All methods are currently commented out - uncomment when ready to integrate with backend
 */


const BASE = "http://localhost:5000/api";

// Starts a session body and layout assigned to that session
export async function startSession() {
   const res = await fetch(`${BASE}/session/start`);
   if (!res.ok) throw new Error("getLayout failed");
   return res.json();
}


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
  // Starts a session body and layout assigned to that session
  async startSession() {
  const res = await fetch(`${BASE}/sessions/start`, {
    method: "POST",
  headers: {
    "Content-Type": "application/json",
  }}
  );


   if (!res.ok) throw new Error("getLayout failed");

   return res.json();
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


