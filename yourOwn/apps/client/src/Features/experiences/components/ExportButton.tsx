import { useState } from 'react';
import { motion } from 'framer-motion';
import { useUser } from '../../../core/auth/UserContext';

interface ExportButtonProps {
  className?: string;
}

/**
 * ExportButton - Export portfolio as ZIP file via server endpoint
 * Creates a beautiful export experience with loading states
 */
export default function ExportButton({ className = '' }: ExportButtonProps) {
  const { user, portfolioEntries } = useUser();
  const [isExporting, setIsExporting] = useState(false);

  const exportAsZip = async () => {
    setIsExporting(true);
    try {
      // Prepare data for export
      const exportData = {
        userName: user?.name,
        userBio: user?.bio,
        entries: portfolioEntries.map((entry) => ({
          id: entry.id,
          title: entry.title,
          summary: entry.summary,
          type: entry.type,
          start: entry.start,
          end: entry.end,
          images: entry.images || [],
        })),
      };

  
      const response = await fetch('http://localhost:5000/api/export/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          html: exportData
        }),
      });

      if (!response.ok) {
        throw new Error('Export failed');
      }

      // Download the ZIP file
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${user?.name || 'portfolio'}-portfolio.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error exporting portfolio:', error);
      alert('Failed to export portfolio. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className={`relative ${className}`}>
      <motion.button
        onClick={exportAsZip}
        disabled={isExporting || portfolioEntries.length === 0}
        whileHover={{ scale: isExporting ? 1 : 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`
          px-6 py-3 rounded-xl font-medium transition-all flex items-center gap-2
          ${isExporting
            ? 'bg-[#EFD2A4] cursor-wait'
            : portfolioEntries.length === 0
            ? 'bg-zinc-700 cursor-not-allowed opacity-50'
            : 'bg-[#EFD2A4] hover:bg-[#4D3131]'
          }
          text-white
        `}
      >
        {isExporting ? (
          <>
            <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <span>Exporting Portfolio...</span>
          </>
        ) : (
          <>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>Export Portfolio</span>
          </>
        )}
      </motion.button>
    </div>
  );
}
