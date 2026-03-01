import { NavLink } from "react-router-dom";
import starr from "../../../../assets/starr.svg"; // This usually imports the URL/path to the SVG

interface VerticalNavData {
  tabs: any[];
  renderTabAction?: (tabName: string) => React.ReactNode;
  renderAddPageAction?: () => React.ReactNode;
}

export const VerticalNav = ({ data }: { data: VerticalNavData }) => {
  const tabs = data?.tabs || [];

  return (
    <nav className="w-full px-8 py-8">
      <ul className="flex flex-col items-start gap-5">
        {tabs.map((tab: any) => (
          <li key={tab.id} className="w-full h-12 flex items-center justify-start relative group">
            <NavLink
              to={`/preview/${tab.name}`}
              className="transition-all duration-300 ease-in-out relative w-full flex items-center h-full z-10"
              style={{ color: 'var(--nav-text-color)' }}
            >
              {({ isActive }) => (
                <div className="flex  justify-start min-w-[40px] h-10 w-full pointer-events-none">
                  <div className="flex items-center w-full h-full pointer-events-auto">
                    {isActive ? (
                      /* ACTIVE STATE: SVG replaces text */
                      <div className="animate-in fade-in zoom-in duration-300 flex items-center justify-center px-8">
                        <img
                          src={starr}
                          alt="active indicator"
                          className="w-12 h-12 object-contain"
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
                </div>
              )}
            </NavLink>

            {/* Render injected Tab Actions if provided by the Editor */}
            {data.renderTabAction && (
              <div className="absolute right-0 top-1/2 -translate-y-1/2 z-20 flex items-center justify-end pr-4 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-auto">
                {data.renderTabAction(tab.name || tab.label)}
              </div>
            )}
          </li>
        ))}
        {/* Render injected Add Page Action if provided by the Editor */}
        {data.renderAddPageAction && (
          <li className="w-full h-12 flex items-center justify-start mt-4">
            {data.renderAddPageAction()}
          </li>
        )}
      </ul>
    </nav>
  );
};