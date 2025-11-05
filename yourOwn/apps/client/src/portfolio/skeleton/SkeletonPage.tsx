// src/portfolio/skeleton/SkeletonPage.tsx
import { useEffect, useMemo, useState } from 'react';
import { Block } from '../types';
import { renderBlocks } from '../render/renderBlocks';
import { demoBlocks } from '../demo/demoData';
import { toExperienceBlock } from '../adapters/toBlock';

const STORAGE_KEY = 'yourOwn.blocks.v1';

export default function SkeletonPage() {
  const [blocks, setBlocks] = useState<Block[]>([]);

  // hydrate from localStorage, else demo
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setBlocks(JSON.parse(raw));
      else setBlocks(demoBlocks);
    } catch {
      setBlocks(demoBlocks);
    }
  }, []);

  // persist on change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(blocks));
    } catch {}
  }, [blocks]);

  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');

  const canAdd = useMemo(() => title.trim().length > 0, [title]);

  function addExperience() {
    if (!canAdd) return;
    const block = toExperienceBlock({ title, summary });
    setBlocks((prev) => [block, ...prev]);
    setTitle('');
    setSummary('');
  }

  function resetAll() {
    setBlocks(demoBlocks);
  }

  return (
    <main className="mx-auto max-w-2xl space-y-6 p-6">
      <section className="rounded-2xl border p-4 bg-white/10 backdrop-blur">
        <h2 className="text-xl font-semibold mb-3">Add Experience</h2>
        <div className="space-y-3">
          <div className="space-y-1">
            <label className="text-sm">Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Backend Lead — Orbital"
              className="w-full rounded-lg border px-3 py-2 bg-white/70"
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm">Summary (optional)</label>
            <textarea
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Short one-liner about the impact"
              className="w-full rounded-lg border px-3 py-2 bg-white/70"
              rows={3}
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={addExperience}
              disabled={!canAdd}
              className="rounded-lg px-3 py-2 shadow bg-black text-white disabled:opacity-40"
            >
              Add Experience
            </button>
            <button
              onClick={resetAll}
              className="rounded-lg px-3 py-2 border"
              title="Reload demo data"
            >
              Reset demo
            </button>
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Portfolio</h2>
        <div className="grid gap-4">{renderBlocks(blocks)}</div>
      </section>
    </main>
  );
}
