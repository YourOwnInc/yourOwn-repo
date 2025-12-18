import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUser } from '../contexts/UserContext';
import { PortfolioEntry, GridSize } from '../types';
import BlurOverlay, { ProgressiveBlur } from '../components/BlurOverlay';
import PortfolioGrid from '../components/PortfolioGrid';
import ExportButton from '../components/ExportButton';
import { usePortfolioStore } from '../domain/usePortfolioStore';

export default function PortfolioBuilder() {
  const { user, sessionId,  portfolioEntries, setPortfolioEntries, addPortfolioEntry, updatePortfolioEntry, removePortfolioEntry } = useUser();
  const [isBlurred, setIsBlurred] = useState(true);
  const [userDataUnblurred, setUserDataUnblurred] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  
   const [newEntry, setNewEntry] = useState({
    title: '',
    summary: '',
    type: '',
    start: '',
    end: '',
    images: [] as string[],
  });
  const {addExperience, removeExperience, editExperience} = usePortfolioStore();


  // Auto-unblur user data on mount
  useEffect(() => {
    if (user?.name && user?.bio) {
      setTimeout(() => {
        setUserDataUnblurred(true);
      }, 500);
      setTimeout(() => {
        setIsBlurred(false);
      }, 1000);
    }
  }, [user]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach((file) => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const result = event.target?.result as string;
          if (result) {
            setNewEntry({
              ...newEntry,
              images: [...newEntry.images, result],
            });
          }
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const handleRemoveImage = (index: number) => {
    setNewEntry({
      ...newEntry,
      images: newEntry.images.filter((_, i) => i !== index),
    });
  };

  const handleAddEntry = () => {
    if (!newEntry.title.trim() || !newEntry.summary.trim()) return;

    const entry: PortfolioEntry = {
      id: `entry-${Date.now()}`,
      sessionId: 'local-session',
      title: newEntry.title,
      summary: newEntry.summary,
      type: newEntry.type || undefined,
      start: newEntry.start || undefined,
      end: newEntry.end || undefined,
      images: newEntry.images.length > 0 ? newEntry.images : undefined,
      position: {
        x: (portfolioEntries.length % 4) + 1,
        y: Math.floor(portfolioEntries.length / 4) + 1,
      },
      size: {
        width: 1,
        height: 1,
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    addExperience(entry);
    setNewEntry({ title: '', summary: '', type: '', start: '', end: '', images: [] });
    setShowAddForm(false);
  };

  const handleResize = (id: string, size: GridSize) => {
    updatePortfolioEntry(id, { size });
  };

  const handleReorder = (entries: PortfolioEntry[]) => {
    setPortfolioEntries(entries);
  };

  const handleDelete = (id: string) => {
    removePortfolioEntry(id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0d0d0d] via-zinc-900 to-[#0d0d0d] text-white p-8" id="portfolio-export">
      {/* Header with user data - auto-unblurred */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: userDataUnblurred ? 1 : 0, y: userDataUnblurred ? 0 : -20 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <ProgressiveBlur blurLevel={userDataUnblurred ? 0 : 1} className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-[#F5EBCB] via-[#E8DE99] to-[#92BFD0] bg-clip-text text-transparent">
                {user?.name ? `${user.name}'s Portfolio` : 'My Portfolio'}
              </h1>
              {user?.bio && (
                <p className="text-xl text-zinc-300 max-w-3xl leading-relaxed">{user.bio}</p>
              )}
            </div>
          </div>
        </ProgressiveBlur>
      </motion.div>

      {/* Export Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mb-6 flex justify-end"
      >
        <ExportButton />
      </motion.div>

      {/* Add Entry Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mb-6"
      >
        <BlurOverlay isBlurred={isBlurred}>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="px-6 py-3 rounded-xl bg-[#0d0d0d] hover:bg-[#4D3131] text-white font-medium transition-all flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Experience
          </button>
        </BlurOverlay>
      </motion.div>

      {/* Add Entry Form */}
      <AnimatePresence>
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="mb-6 p-6 rounded-xl bg-zinc-800/50 backdrop-blur-sm border border-[#4D3131]"
          >
            <h3 className="text-xl font-semibold mb-4">New Experience Entry</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Title"
                value={newEntry.title}
                onChange={(e) => setNewEntry({ ...newEntry, title: e.target.value })}
                className="px-4 py-2 rounded-lg bg-zinc-900 border border-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-[#4D3131]"
              />
              <input
                type="text"
                placeholder="Type (e.g., project, internship)"
                value={newEntry.type}
                onChange={(e) => setNewEntry({ ...newEntry, type: e.target.value })}
                className="px-4 py-2 rounded-lg bg-zinc-900 border border-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-[#4D3131]"
              />
              <textarea
                placeholder="Summary"
                value={newEntry.summary}
                onChange={(e) => setNewEntry({ ...newEntry, summary: e.target.value })}
                rows={3}
                className="px-4 py-2 rounded-lg bg-zinc-900 border border-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-[#4D3131] md:col-span-2 resize-none"
              />
              <input
                type="text"
                placeholder="Start date (optional)"
                value={newEntry.start}
                onChange={(e) => setNewEntry({ ...newEntry, start: e.target.value })}
                className="px-4 py-2 rounded-lg bg-zinc-900 border border-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-[#4D3131]"
              />
              <input
                type="text"
                placeholder="End date (optional)"
                value={newEntry.end}
                onChange={(e) => setNewEntry({ ...newEntry, end: e.target.value })}
                className="px-4 py-2 rounded-lg bg-zinc-900 border border-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-[#4D3131]"
              />
            </div>
            
            {/* Image Upload */}
            <div className="mt-4">
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Images (optional)
              </label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
              />
              <label
                htmlFor="image-upload"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-700 hover:bg-zinc-600 text-white cursor-pointer transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Upload Images
              </label>
              
              {/* Preview uploaded images */}
              {newEntry.images.length > 0 && (
                <div className="mt-4 grid grid-cols-4 gap-2">
                  {newEntry.images.map((image, idx) => (
                    <div key={idx} className="relative group">
                      <img
                        src={image}
                        alt={`Upload ${idx + 1}`}
                        className="w-full h-24 object-cover rounded-lg border border-zinc-700"
                      />
                      <button
                        onClick={() => handleRemoveImage(idx)}
                        className="absolute top-1 right-1 p-1 rounded-full bg-red-500/80 hover:bg-red-500 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="flex gap-3 mt-4">
              <button
                onClick={handleAddEntry}
                disabled={!newEntry.title.trim() || !newEntry.summary.trim()}
                className={`px-6 py-2 rounded-lg font-medium transition-all ${
                  newEntry.title.trim() && newEntry.summary.trim()
                    ? 'bg-[#4D3131] hover:bg-[#301F1F] text-white'
                    : 'bg-zinc-700 cursor-not-allowed text-zinc-400'
                }`}
              >
                Add Entry
              </button>
              <button
                onClick={() => {
                  setShowAddForm(false);
                  setNewEntry({ title: '', summary: '', type: '', start: '', end: '', images: [] });
                }}
                className="px-6 py-2 rounded-lg bg-zinc-700 hover:bg-zinc-600 text-white font-medium transition-all"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Portfolio Grid */}
      <BlurOverlay isBlurred={isBlurred}>
        {portfolioEntries.length > 0 ? (
          <PortfolioGrid
            entries={portfolioEntries}
            onReorder={handleReorder}
            onDelete={handleDelete}
            onResize={handleResize}
          />
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 text-zinc-500"
          >
            <p className="text-xl mb-4">Your portfolio is empty</p>
            <p className="text-sm">Add your first experience to get started</p>
          </motion.div>
        )}
      </BlurOverlay>
    </div>
  );
}
