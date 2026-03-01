import { NavLink } from "react-router-dom";
import starr from "../../../../assets/starr.svg"; // This usually imports the URL/path to the SVG

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
        {data.isEditing && (
          <li className="w-full h-12 flex items-center justify-start mt-4">
            <button
              onClick={data.onAddTab}
              className="group flex justify-start items-center min-w-[40px] h-10 w-full transition-all duration-300 ease-in-out text-zinc-500 hover:text-white"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-md border border-dashed border-zinc-600 group-hover:bg-zinc-800 transition-colors ml-1">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
              </div>
              <span className="ml-4 text-xs font-bold tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                Add Page
              </span>
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};