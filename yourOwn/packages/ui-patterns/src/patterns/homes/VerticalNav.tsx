import { NavLink } from "react-router-dom";

export const VerticalNav = ({ data }: { data: any }) => {
  // Ensure we are accessing the tabs correctly from the manifest data
  const tabs = data?.tabs || [];

  return (
    <ul className="flex flex-col w-full gap-1">
      {tabs.map((tab: any) => (
        <li key={tab.id} className="w-full">
          <NavLink
            to={`/preview/${tab.name}`}
            className={({ isActive }) =>
              `group flex items-center px-4 py-2 text-sm font-medium transition-all duration-200 rounded-md ${
                isActive
                  ? "bg-white text-black shadow-sm" // High contrast active state
                  : "text-gray-400 hover:text-white hover:bg-white/10" // Subtle hover state
              }`
            }
          >
            {/* The label or name from your manifest */}
            {tab.name || tab.label}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};