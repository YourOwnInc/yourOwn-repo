import React from "react";

// The SVG paths from packages/assets/
const HORIZONTAL_LINE = "/assets/HorLine.svg";
const VERTICAL_LINE = "/assets/VertLine.svg";

interface TimelineProps {
    data: any[]; // Expecting an array of work experiences
}

export const Timeline: React.FC<TimelineProps> = ({ data }) => {

    console.log("data in Timeline", data);
    if (!Array.isArray(data) || data.length === 0) {
        return (
            <div className="p-8 text-center text-[#4E5D4B]/50 font-afacad">
                <p>No work experiences available.</p>
            </div>
        );
    }

    // Sort by start date, newest first
    const sortedData = [...data].sort((a, b) => {
        const dateA = new Date(a.startDate).getTime();
        const dateB = new Date(b.startDate).getTime();
        return dateB - dateA;
    });

    return (
        <div className="relative w-full py-16 bg-[#FDFFE8] font-afacad text-[#4E5D4B]">

            <div className="max-w-5xl mx-auto relative pl-12 lg:pl-[120px]">

                {/* Continuous Main Vertical Track - Red E56565 */}
                <div
                    className="absolute top-0 bottom-0 left-[28px] lg:left-[50px] z-10"
                    style={{ width: '4px', backgroundColor: '#E56565' }}
                />

                <div className="space-y-28 lg:space-y-32">
                    {sortedData.map((exp: any, index: number) => {
                        const variantInfo = exp.variants?.[0] || {};

                        // Format dates e.g. "November 2024 - Present"
                        const startStr = new Date(exp.startDate).toLocaleDateString("en-US", { month: "long", year: "numeric" });
                        const endStr = exp.isCurrent || !exp.endDate
                            ? "Present"
                            : new Date(exp.endDate).toLocaleDateString("en-US", { month: "long", year: "numeric" });

                        const dateDisplay = `${startStr} - ${endStr}`;

                        return (
                            <div key={exp.id || index} className="relative flex flex-col items-start w-full group">

                                {/* Horizontal intersection SVG wrapper */}
                                <div className="absolute top-[4.5rem] -left-[42px] lg:-left-[64px] z-20 flex items-center h-[12px]">
                                    {/* Using the provided SVG for the intersection */}
                                    <img
                                        src={HORIZONTAL_LINE}
                                        alt="Timeline Connector"
                                        className="h-full object-contain"
                                        style={{ width: '59px' }}
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).style.display = 'none';
                                            const parent = (e.target as HTMLElement).parentElement;
                                            if (parent) {
                                                const fallback = document.createElement('div');
                                                fallback.style.width = '59px';
                                                fallback.style.height = '4px';
                                                fallback.style.backgroundColor = '#E56565';
                                                parent.appendChild(fallback);
                                            }
                                        }}
                                    />
                                </div>

                                {/* Main Content Layout */}
                                <div className="w-full pt-4 pr-6 lg:pr-12">

                                    {/* Row 1: Date & Role (Small top text) */}
                                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end w-[calc(100%-120px)] md:w-[calc(100%-160px)] mb-1">
                                        <span className="text-sm md:text-base tracking-wide text-[#4E5D4B]/70 block mb-2 md:mb-0">
                                            {dateDisplay}
                                        </span>

                                        {exp.roleTitle && (
                                            <span className="text-xl md:text-2xl text-[#4E5D4B] font-light md:text-right">
                                                {exp.roleTitle} with
                                            </span>
                                        )}
                                    </div>

                                    {/* Row 2: Organization Name + Logo block */}
                                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between w-full mb-6">

                                        <h3 className="text-6xl md:text-7xl lg:text-8xl xl:text-[90px] font-normal leading-none tracking-tight text-[#4E5D4B] max-w-[70%]">
                                            {exp.organization}
                                        </h3>

                                        {/* Placeholder Logo Square matching design specs */}
                                        <div className="w-28 h-28 md:w-36 md:h-36 shrink-0 bg-[#d9d9d9] flex items-center justify-center mt-6 md:mt-0 md:-translate-y-6">
                                            <span className="text-sm font-semibold tracking-widest text-[#1a1a1a]">LOGO</span>
                                        </div>

                                    </div>

                                    {/* Row 3: Summary text */}
                                    {variantInfo.summaryShort && (
                                        <div className="w-full flex justify-end">
                                            <div className="w-full md:w-[85%] lg:w-[80%] pr-0 md:pr-16 lg:pr-32">
                                                <p className="text-2xl md:text-3xl lg:text-[32px] leading-[1.3] text-[#4E5D4B] font-light text-left md:text-right">
                                                    {variantInfo.summaryShort}
                                                </p>
                                            </div>
                                        </div>
                                    )}

                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
