import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider, useUser } from './core/auth/UserContext';

import {RendererLab} from './shared/RendererLab';
import ExperienceHub from './Features/experiences/Pages/ExperienceHub';
import { PortfolioPage } from './Features/portfolio-preview/Pages/PortfolioPage';
import { ProfilePreview } from './Features/Profile/Pages/profilePreview';
import DashboardPage from "./Features/dashboard/dashboardPage"
import Landing  from "./Features/dashboard/landingPage"

function AppContent() {
  const { onboardingComplete, user } = useUser();
  console.log("user ", user );
  
  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/" 
          element={user ?<Navigate to="/Dashboard" replace /> : <Navigate to="/landing" replace /> } 
        />
        <Route path="/Dashboard" element={<DashboardPage />} />
        <Route path="/landing" element={<Landing />} />
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
