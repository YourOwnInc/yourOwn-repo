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
    const [selectedVariant, setSelectedVariant] = useState("");
    const [selectedPattern, setSelectedPattern] = useState("generic-card");

    if (!isOpen || !slotId) return null;
    console.log("experienceLibrary", experienceLibrary);

    // Find the variants for the currently selected experience
    const activeExperience = experienceLibrary.flat(Infinity).find((exp: any) => exp.id === selectedExp) as any;
    console.log("activeExperience", activeExperience);
    // grab experience library and extract titles and ids. 
    const availableVariants = experienceLibrary.flat(Infinity).map((exp: any) => ({
        id: exp.id,
        title: exp.title,
        variants: exp.variants
    }));
    console.log("availableVariants", availableVariants);

    const handleExperienceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const expId = e.target.value;
        setSelectedExp(expId);

        // Auto-select the first variant if available
        const newActiveExp = experienceLibrary.flat(Infinity).find((exp: any) => exp.id === expId) as any;
        if (newActiveExp?.variants?.length > 0) {
            setSelectedVariant(newActiveExp.variants[0].id);
        } else {
            setSelectedVariant("");
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Since we now rely on experienceVariantId instead of experienceId
        if (!selectedVariant || !selectedPattern) return;

        onSubmit({ slotId, experienceVariantId: selectedVariant, patternId: selectedPattern } as any);
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
                                onChange={handleExperienceChange}
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

                        {selectedExp && availableVariants.length > 0 && (
                            <div className="space-y-2">
                                <label htmlFor="variant" className="text-xs font-bold uppercase tracking-widest text-zinc-500">
                                    Variant
                                </label>
                                <select
                                    id="variant"
                                    value={selectedVariant}
                                    onChange={(e) => setSelectedVariant(e.target.value)}
                                    required
                                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 text-zinc-100 focus:outline-none focus:border-zinc-500 transition-colors cursor-pointer"
                                >
                                    {availableVariants.map((variant: any) => (
                                        <option key={variant.id} value={variant.id}>
                                            {variant.label}
                                        </option>
                                    ))}
                                </select>
                                {availableVariants.find((v: any) => v.id === selectedVariant)?.summaryShort && (
                                    <p className="text-xs text-zinc-400 mt-2 italic">
                                        "{availableVariants.find((v: any) => v.id === selectedVariant)?.summaryShort}"
                                    </p>
                                )}
                            </div>
                        )}

                        {selectedExp && availableVariants.length === 0 && (
                            <div className="p-3 bg-red-900/30 border border-red-800 rounded-lg text-sm text-red-200">
                                This experience has no variants, so it cannot be placed.
                            </div>
                        )}

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
                            disabled={isLoading || !selectedVariant}
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
