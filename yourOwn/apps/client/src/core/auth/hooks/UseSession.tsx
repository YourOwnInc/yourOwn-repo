import { sessionService } from "../sessionService";

// Context to manager user sessions and experiences of those sessions 
// Will hold the logic to fetch experience data for a given session
// And hold the data for the current session in context

export function useSession() {
    const startNewSession = async () => {
        try {
            await sessionService.startSession();
            
        } catch (error) {
            console.error("Failed to start new session:", error);
        }
    }

    


}