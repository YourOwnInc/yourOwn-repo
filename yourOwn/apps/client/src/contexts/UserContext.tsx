import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, SessionId, PortfolioEntry } from '../types';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { STORAGE_KEYS } from '../types';

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  sessionId: SessionId | null;
  setSessionId: (id: SessionId | null) => void;
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
  const [user, setUser] = useLocalStorage<User | null>(STORAGE_KEYS.USER_DATA, null);
  const [sessionId, setSessionId] = useLocalStorage<SessionId | null>(STORAGE_KEYS.SESSION_ID, null);
  const [onboardingComplete, setOnboardingComplete] = useLocalStorage<boolean>(
    STORAGE_KEYS.ONBOARDING_COMPLETE,
    false
  );
  const [portfolioEntries, setPortfolioEntries] = useLocalStorage<PortfolioEntry[]>(
    STORAGE_KEYS.PORTFOLIO_ENTRIES,
    []
  );

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

