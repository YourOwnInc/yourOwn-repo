import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider, useUser } from './contexts/UserContext';
import Landing from './Pages/Landing';
import PortfolioBuilder from './Pages/PortfolioBuilder';
import {RendererLab} from './Pages/RendererLab';
import ExperienceHub from './Pages/ExperienceHub';
import { PreviewPage } from './Pages/Preview';

function AppContent() {
  const { onboardingComplete } = useUser();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/landing" element={<Landing />} />
        <Route path="/portfoliobuilder" element={<PortfolioBuilder />} />
        <Route path="/lab" element={<RendererLab />} />
        <Route path="/experiences" element={<ExperienceHub  />} />
        <Route path="/preview" element={<PreviewPage />} />
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
