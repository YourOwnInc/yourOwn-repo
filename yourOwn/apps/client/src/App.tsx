import { UserProvider } from './contexts/UserContext';
import Landing from './Pages/Landing';

function AppContent() {
  return <Landing />;
}

export default function App() {
  return (
    <UserProvider>
      <AppContent />
    </UserProvider>
  );
}
