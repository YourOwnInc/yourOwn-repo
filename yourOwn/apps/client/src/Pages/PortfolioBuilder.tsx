// apps/client/src/Pages/PortfolioBuilder.tsx
import { usePortfolioStore } from '../domain/usePortfolioStore';
import { useExperiences } from '../hooks/useExperiences';
import PortfolioGrid from '../components/PortfolioGrid';

export default function PortfolioBuilder() {
  // 1. Get Domain State (this hook now uses context internally)
  const {  loading, error, removeExperience } = usePortfolioStore();
  const { experiences } = useExperiences();

  // if (loading) return <div className="p-8 text-white">Syncing with server...</div>;
  // if (error) return <div className="p-8 text-red-500">Error: {error}</div>;

  return (
    <div className="min-h-screen bg-zinc-900 text-white p-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold">Portfolio Editor</h1>
      </header>

      {/* 2. Distribute data to child components */}
      {experiences.length > 0 ? (
        <PortfolioGrid
          entries={experiences} // Ensure your Store maps these to PortfolioEntry type
          onReorder={() => { /* Logic to call store.upsertPlacement */ }}
          onDelete={removeExperience}
        />
      ) : (
        <div className="text-zinc-500">No experiences found. Add one to get started.</div>
      )}
    </div>
  );
}