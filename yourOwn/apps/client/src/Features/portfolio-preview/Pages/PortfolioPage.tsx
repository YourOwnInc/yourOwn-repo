// src/features/portfolio-preview/Pages/PortfolioPage.tsx
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { usePortfolioManifest } from '../hooks/usePortfolioManifest';
import { PortfolioViewer } from '../components/PortfolioViewer';
import { PortfolioEditor } from '../components/PortfolioEditor';

export const PortfolioPage = () => {
  const { sessionId } = useParams(); // From URL: /sessions/:sessionId/preview
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('home');

  // 1. Fetch the "Skeleton" (Tabs + Profile)
  const { data: manifest, isLoading } = usePortfolioManifest(sessionId!);

  if (isLoading) return <div>Loading Portfolio...</div>;

  return (
    <div className="portfolio-container">
      {/* Shared Header across both modes */}
      <header>
        <h1>{manifest.profile.name}</h1>
        <nav>
          {manifest.tabs.map(tab => (
            <button 
              key={tab.id} 
              onClick={() => setActiveTab(tab.name)}
              className={activeTab === tab.name ? 'active' : ''}
            >
              {tab.name}
            </button>
          ))}
        </nav>
        <button onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? "View Live" : "Edit Design"}
        </button>
      </header>

      <main>
        {/* The Renderer is called INSIDE these components */}
        {isEditing ? (
          <PortfolioEditor layoutName={activeTab} />
        ) : (
          <PortfolioViewer layoutName={activeTab} />
        )}
      </main>
    </div>
  );
};