import React, { useState } from "react";
import { PATTERN_REGISTRY } from "@yourown/ui-patterns/src/registry";
import { ExperienceEntry } from "../../../shared/types";

interface AddExperienceModalProps {
    isOpen: boolean;
    slotId: string | null;
    experienceLibrary: ExperienceEntry[];
    onClose: () => void;
    onSubmit: (data: { slotId: string; experienceId: string; patternId: string }) => void;
    isLoading?: boolean;
}

export const AddExperienceModal = ({ isOpen, slotId, experienceLibrary, onClose, onSubmit, isLoading }: AddExperienceModalProps) => {
    const [selectedExp, setSelectedExp] = useState("");
    const [selectedPattern, setSelectedPattern] = useState("generic-card");

    if (!isOpen || !slotId) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedExp || !selectedPattern) return;

        onSubmit({ slotId, experienceId: selectedExp, patternId: selectedPattern });
    };

    const patternKeys = Object.keys(PATTERN_REGISTRY);

    return (
        <div className="fixed inset-0 z-[999] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-zinc-950 border border-zinc-800 rounded-xl w-full max-w-md shadow-2xl overflow-hidden text-zinc-100">
                <form onSubmit={handleSubmit} className="flex flex-col">
                    <div className="p-6 border-b border-zinc-800/80">
                        <h2 className="text-xl font-bold">Add Experience to {slotId}</h2>
                        <p className="text-sm text-zinc-400 mt-1">Select an experience and its visual pattern.</p>
                    </div>

                    <div className="p-6 space-y-6">
                        <div className="space-y-2">
                            <label htmlFor="experience" className="text-xs font-bold uppercase tracking-widest text-zinc-500">
                                Experience
                            </label>
                            <select
                                id="experience"
                                value={selectedExp}
                                onChange={(e) => setSelectedExp(e.target.value)}
                                required
                                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 text-zinc-100 focus:outline-none focus:border-zinc-500 transition-colors cursor-pointer"
                            >
                                <option value="" disabled>-- Select Experience --</option>
                                {experienceLibrary.flat(Infinity).map((exp: any) => (
                                    <option key={exp.id} value={exp.id}>
                                        {exp.title} ({exp.type})
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="pattern" className="text-xs font-bold uppercase tracking-widest text-zinc-500">
                                Design Pattern
                            </label>
                            <select
                                id="pattern"
                                value={selectedPattern}
                                onChange={(e) => setSelectedPattern(e.target.value)}
                                required
                                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 text-zinc-100 focus:outline-none focus:border-zinc-500 transition-colors cursor-pointer"
                            >
                                {patternKeys.map((key) => (
                                    <option key={key} value={key}>
                                        {key.replace("-", " ").toUpperCase()}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="p-4 border-t border-zinc-800/80 bg-zinc-900/50 flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={isLoading}
                            className="px-4 py-2 text-sm font-medium text-zinc-400 hover:text-white transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading || !selectedExp}
                            className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? "Saving..." : "Save Placement"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
