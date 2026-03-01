import React, { useState } from "react";
import { LAYOUT_REGISTRY } from "../../../../../../packages/layouts/layoutRegistry";

interface AddTabModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: { layoutName: string; template: string }) => void;
    isLoading?: boolean;
}

export const AddTabModal = ({ isOpen, onClose, onSubmit, isLoading }: AddTabModalProps) => {
    const [tabName, setTabName] = useState("");
    const [selectedTemplate, setSelectedTemplate] = useState("bento-v1");

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!tabName.trim()) return;

        // Convert to URL-friendly lowercase name
        const formatName = tabName.trim().toLowerCase().replace(/\s+/g, "-");
        onSubmit({ layoutName: formatName, template: selectedTemplate });
    };

    const layoutKeys = Object.keys(LAYOUT_REGISTRY).filter(k => k !== "profile-sidebar");

    return (
        <div className="fixed inset-0 z-[999] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-zinc-950 border border-zinc-800 rounded-xl w-full max-w-md shadow-2xl overflow-hidden text-zinc-100">
                <form onSubmit={handleSubmit} className="flex flex-col">
                    <div className="p-6 border-b border-zinc-800/80">
                        <h2 className="text-xl font-bold">Add New Page</h2>
                        <p className="text-sm text-zinc-400 mt-1">Create a new section for your portfolio.</p>
                    </div>

                    <div className="p-6 space-y-6">
                        <div className="space-y-2">
                            <label htmlFor="tabName" className="text-xs font-bold uppercase tracking-widest text-zinc-500">
                                Page Name
                            </label>
                            <input
                                id="tabName"
                                type="text"
                                autoFocus
                                placeholder="e.g. Experience, Projects"
                                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500 transition-colors"
                                value={tabName}
                                onChange={(e) => setTabName(e.target.value)}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="template" className="text-xs font-bold uppercase tracking-widest text-zinc-500">
                                Layout Template
                            </label>
                            <select
                                id="template"
                                value={selectedTemplate}
                                onChange={(e) => setSelectedTemplate(e.target.value)}
                                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 text-zinc-100 focus:outline-none focus:border-zinc-500 transition-colors appearance-none cursor-pointer"
                            >
                                {layoutKeys.map((key) => (
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
                            disabled={isLoading || !tabName.trim()}
                            className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? "Creating..." : "Create Page"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
