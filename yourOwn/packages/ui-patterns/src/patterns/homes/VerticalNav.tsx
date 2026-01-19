// packages/ui-patterns/src/patterns/VerticalNav.tsx
import { NavLink } from "react-router-dom";

export const VerticalNav = ({ manifest }: { manifest: any }) => (
  <ul className="space-y-2">
    {manifest.tabs.map((tab: any) => (
      <li key={tab.id}>
        <NavLink 
          to={`/portfolio/${tab.name}`}
          className={({ isActive }) => 
            `block px-4 py-2 rounded-lg transition-colors ${
              isActive ? "bg-primary text-white" : "hover:bg-accent"
            }`
          }
        >
          {tab.label}
        </NavLink>
      </li>
    ))}
  </ul>
);