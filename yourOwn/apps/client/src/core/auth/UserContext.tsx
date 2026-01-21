import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { User, SessionId, PortfolioEntry } from '../../shared/types';
import { useLocalStorage } from './hooks/useLocalStorage';
import { STORAGE_KEYS } from '../../shared/types';

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  sessionId: SessionId | null;
  setSessionId: (id: SessionId | null) => void;
  authToken: string | null;
  setAuthToken: (token: string | null) => void;
  onboardingComplete: boolean;
  setOnboardingComplete: (complete: boolean) => void;
  portfolioEntries: PortfolioEntry[];
  setPortfolioEntries: (entries: PortfolioEntry[]) => void;
  addPortfolioEntry: (entry: PortfolioEntry) => void;
  updatePortfolioEntry: (id: string, updates: Partial<PortfolioEntry>) => void;
  removePortfolioEntry: (id: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useLocalStorage<User | null>(STORAGE_KEYS.USER_DATA);
  const [sessionId, setSessionIdState] = useState<SessionId | null>(null);
  const [authToken, setAuthTokenState] = useState<string | null>(null);
  const [onboardingComplete, setOnboardingComplete] = useLocalStorage<boolean>(
    STORAGE_KEYS.ONBOARDING_COMPLETE
  );
  const [portfolioEntries, setPortfolioEntries] = useLocalStorage<PortfolioEntry[]>(
    STORAGE_KEYS.PORTFOLIO_ENTRIES
  );

  // Restore sessionId and authToken from localStorage on mount
  useEffect(() => {
    const storedSessionId = localStorage.getItem(STORAGE_KEYS.SESSION_ID);
    const storedAuthToken = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
    console.log("sessionIds from storage", storedSessionId);
    console.log("AuthToken from storage", storedAuthToken);

    if (storedSessionId) setSessionIdState(storedSessionId as SessionId);
    if (storedAuthToken) setAuthTokenState(storedAuthToken);
  }, []);

  // wrappers that also persist to localStorage (optional)
  const setSessionId = (id: SessionId | null ) => {
    setSessionIdState(id);
    if (id) localStorage.setItem(STORAGE_KEYS.SESSION_ID, id);
    else localStorage.removeItem(STORAGE_KEYS.SESSION_ID);
  };

  const setAuthToken = (token: string | null) => {
    setAuthTokenState(token);
    if (token) localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
    else localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
  };

  const addPortfolioEntry = (entry: PortfolioEntry) => {
    setPortfolioEntries([...portfolioEntries, entry]);
  };

  const updatePortfolioEntry = (id: string, updates: Partial<PortfolioEntry>) => {
    setPortfolioEntries(
      portfolioEntries.map((entry) => (entry.id === id ? { ...entry, ...updates } : entry))
    );
  };

  const removePortfolioEntry = (id: string) => {
    setPortfolioEntries(portfolioEntries.filter((entry) => entry.id !== id));
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        sessionId,
        setSessionId,
        authToken,
        setAuthToken,
        onboardingComplete,
        setOnboardingComplete,
        portfolioEntries,
        setPortfolioEntries,
        addPortfolioEntry,
        updatePortfolioEntry,
        removePortfolioEntry,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}

