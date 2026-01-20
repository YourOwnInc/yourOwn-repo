import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider, useUser } from './contexts/UserContext';
import Landing from './Pages/Landing';
import PortfolioBuilder from './Pages/PortfolioBuilder';
import {RendererLab} from './Pages/RendererLab';
import ExperienceHub from './Pages/ExperienceHub';
import { PortfolioPage } from './Features/portfolio-preview/Pages/PortfolioPage';
import { ProfilePreview } from './Features/Profile/Pages/profilePreview';


function AppContent() {
  const { onboardingComplete } = useUser();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/landing" element={<Landing />} />
        <Route path="/portfoliobuilder" element={<PortfolioBuilder />} />
        <Route path="/lab" element={<RendererLab />} />
        <Route path="/experiences" element={<ExperienceHub  />} />
        <Route path="/profile" element={<ProfilePreview />} />
        <Route path="/preview" element={<PortfolioPage />}>
            <Route path=":LayoutName" element={<PortfolioPage />} />
        </Route>
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
