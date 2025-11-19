import { useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from '@dnd-kit/sortable';
import { PortfolioEntry } from '../types';
import ExperienceCard from './ExperienceCard';

interface PortfolioGridProps {
  entries: PortfolioEntry[];
  onReorder: (entries: PortfolioEntry[]) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onResize?: (id: string, size: { width: number; height: number }) => void;
}

/**
 * PortfolioGrid - Modular grid layout with drag-and-drop
 * Supports flexible card sizing and artistic arrangement
 */
export default function PortfolioGrid({
  entries,
  onReorder,
  onEdit,
  onDelete,
  onResize,
}: PortfolioGridProps) {
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event: { active: { id: string } }) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (over && active.id !== over.id) {
      const oldIndex = entries.findIndex((entry) => entry.id === active.id);
      const newIndex = entries.findIndex((entry) => entry.id === over.id);

      const newEntries = arrayMove(entries, oldIndex, newIndex);
      // Update positions based on new order
      const updatedEntries = newEntries.map((entry, index) => ({
        ...entry,
        position: {
          x: (index % 4) + 1, // 4 columns
          y: Math.floor(index / 4) + 1,
        },
      }));
      onReorder(updatedEntries);
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={entries.map((e) => e.id)} strategy={rectSortingStrategy}>
        <div
          className="grid gap-4 auto-rows-fr"
          style={{
            gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
            gridAutoRows: 'minmax(150px, auto)',
          }}
        >
          {entries.map((entry, index) => (
            <ExperienceCard
              key={entry.id}
              entry={entry}
              isDragging={activeId === entry.id}
              onEdit={onEdit}
              onDelete={onDelete}
              onResize={onResize}
              index={index}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}

