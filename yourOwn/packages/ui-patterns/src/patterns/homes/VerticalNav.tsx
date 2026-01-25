import { NavLink } from "react-router-dom";
import starr from "./starr.svg"; // This usually imports the URL/path to the SVG

export const VerticalNav = ({ data }: { data: any }) => {
  const tabs = data?.tabs || [];

  return (
    <nav className="w-full px-8 py-8"> 
      <ul className="flex flex-col items-start gap-5">
        {tabs.map((tab: any) => (
          <li key={tab.id} className="w-full h-12 flex items-center justify-start">
            <NavLink
              to={`/preview/${tab.name}`}
              className="group transition-all duration-300 ease-in-out"
              style={{ color: 'var(--nav-text-color)' }}
            >
              {({ isActive }) => (
                <div className="flex  justify-start min-w-[40px] h-10">
                  {isActive ? (
                    /* ACTIVE STATE: SVG replaces text */
                    <div className="animate-in fade-in zoom-in duration-300 flex items-center justify-center px-8">
                      <img 
                        src={starr} 
                        alt="active indicator" 
                        className="w-12 h-12 object-contain"
                        /* If you want to color the SVG via CSS variables, 
                           see the 'Advanced' note below */
                      />
                    </div>
                  ) : (
                    /* INACTIVE STATE: Text label */
                    <span 
                      className=" text-m font-medium tracking-widest uppercase group-hover-[var(--nav-hover-color)]"
                      style={{ transition: 'color 0.2s ease' }}
                    >
                      {tab.name || tab.label}
                    </span>
                  )}
                </div>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};