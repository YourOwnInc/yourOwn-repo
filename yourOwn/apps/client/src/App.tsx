import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider, useUser } from './contexts/UserContext';
import Landing from './Pages/Landing';
import PortfolioBuilder from './Pages/PortfolioBuilder';

function AppContent() {
  const { onboardingComplete } = useUser();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/landing" element={<Landing />} />
        <Route path="/portfoliobuilder" element={<PortfolioBuilder />} />
        <Route
          path="/"
          element={
            <Navigate
              to={onboardingComplete ? '/portfoliobuilder' : '/landing'}
              replace
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default function App() {
  return (
    <UserProvider>
      <AppContent />
    </UserProvider>
  );
}
