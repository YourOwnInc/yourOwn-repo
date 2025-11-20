import { motion } from 'framer-motion';
import { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { PortfolioEntry } from '../types';

interface ExperienceCardProps {
  entry: PortfolioEntry;
  isDragging?: boolean;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onResize?: (id: string, size: { width: number; height: number }) => void;
  index?: number;
}

/**
 * ExperienceCard - Draggable, resizable portfolio entry card
 * Features dream-like entrance animations and smooth interactions
 */
export default function ExperienceCard({
  entry,
  isDragging = false,
  onEdit,
  onDelete,
  onResize,
  index = 0,
}: ExperienceCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isResizing, setIsResizing] = useState(false);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: entry.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    gridColumn: `span ${entry.size.width}`,
    gridRow: `span ${entry.size.height}`,
  };

  const handleResize = (direction: 'width' | 'height', delta: number) => {
    if (!onResize) return;
    
    const newSize = {
      width: entry.size.width,
      height: entry.size.height,
    };

    if (direction === 'width') {
      newSize.width = Math.max(1, Math.min(4, entry.size.width + delta));
    } else {
      newSize.height = Math.max(1, Math.min(4, entry.size.height + delta));
    }

    onResize(entry.id, newSize);
  };

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      {...attributes}
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{
        opacity: isDragging ? 0.5 : 1,
        scale: isDragging ? 0.95 : 1,
        y: 0,
      }}
      transition={{
        duration: 0.4,
        delay: index * 0.1,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      whileHover={{ scale: 1.02 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative group"
    >
      <div
        {...listeners}
        className={`
          h-full p-6 rounded-xl bg-zinc-800/50 backdrop-blur-sm border border-zinc-700
          cursor-grab active:cursor-grabbing
          transition-all duration-300
          ${isHovered ? 'border-[#301F1F] shadow-lg shadow-[#301F1F]' : ''}
          ${isDragging ? 'opacity-50' : ''}
        `}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-white mb-2">{entry.title}</h3>
            {entry.type && (
              <span className="text-xs px-2 py-1 rounded-full bg-[#301F1F] text-indigo-300">
                {entry.type}
              </span>
            )}
          </div>
          
          {/* Action buttons */}
          {isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex gap-2"
            >
              {onEdit && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit(entry.id);
                  }}
                  className="p-2 rounded-lg bg-zinc-700/50 hover:bg-zinc-600 text-zinc-300 hover:text-white transition-colors"
                  title="Edit"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
              )}
              {onDelete && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(entry.id);
                  }}
                  className="p-2 rounded-lg bg-zinc-700/50 hover:bg-red-500/20 text-zinc-300 hover:text-red-400 transition-colors"
                  title="Delete"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              )}
            </motion.div>
          )}
        </div>

        {/* Summary */}
        <p className="text-zinc-400 text-sm line-clamp-3 mb-4">{entry.summary}</p>

        {/* Dates */}
        {(entry.start || entry.end) && (
          <div className="text-xs text-zinc-500 mb-4">
            {entry.start && <span>{entry.start}</span>}
            {entry.start && entry.end && <span> - </span>}
            {entry.end && <span>{entry.end}</span>}
          </div>
        )}

        {/* Images */}
        {entry.images && entry.images.length > 0 && (
          <div className="mt-4 space-y-2">
            <div className="grid grid-cols-2 gap-2">
              {entry.images.slice(0, 4).map((image, idx) => (
                <motion.img
                  key={idx}
                  src={image}
                  alt={`${entry.title} - Image ${idx + 1}`}
                  className="w-full h-24 object-cover rounded-lg border border-zinc-700"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                />
              ))}
            </div>
            {entry.images.length > 4 && (
              <p className="text-xs text-zinc-500 text-center">
                +{entry.images.length - 4} more image{entry.images.length - 4 > 1 ? 's' : ''}
              </p>
            )}
          </div>
        )}

        {/* Resize handles */}
        {isHovered && onResize && (
          <div className="absolute inset-0 pointer-events-none">
            {/* Bottom-right resize handle */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute bottom-0 right-0 w-6 h-6 cursor-se-resize pointer-events-auto"
              onMouseDown={(e) => {
                e.stopPropagation();
                setIsResizing(true);
                const startX = e.clientX;
                const startY = e.clientY;
                const startWidth = entry.size.width;
                const startHeight = entry.size.height;

                const handleMouseMove = (moveEvent: MouseEvent) => {
                  const deltaX = Math.round((moveEvent.clientX - startX) / 100);
                  const deltaY = Math.round((moveEvent.clientY - startY) / 100);
                  handleResize('width', deltaX);
                  handleResize('height', deltaY);
                };

                const handleMouseUp = () => {
                  setIsResizing(false);
                  document.removeEventListener('mousemove', handleMouseMove);
                  document.removeEventListener('mouseup', handleMouseUp);
                };

                document.addEventListener('mousemove', handleMouseMove);
                document.addEventListener('mouseup', handleMouseUp);
              }}
            >
              <div className="w-full h-full flex items-end justify-end">
                <div className="w-3 h-3 border-r-2 border-b-2 border-[#301F1F] rounded-br-lg" />
              </div>
            </motion.div>
          </div>
        )}

        {/* Drag indicator */}
        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute top-2 left-2 text-zinc-500 text-xs"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M11 18c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zm-2-8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 4c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
            </svg>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

