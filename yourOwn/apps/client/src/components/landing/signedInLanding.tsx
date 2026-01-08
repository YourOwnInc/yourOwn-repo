import { useNavigate } from 'react-router-dom';

interface BuilderNavProps {
  className?: string;
}

export default function BuilderNav({ className = "" }: BuilderNavProps) {
  const navigate = useNavigate();

  const navItems = [
    { label: 'Preview', path: '/preview' },
    { label: 'Experiences', path: '/experiences' },
    { label: 'Sandbox', path: '/lab' },
  ];

  return (
    <div className="flex items-center bg-white justify-center min-h-screen">
      <div className={`flex flex-row items-center justify-center gap-20 ${className}`}>
        {navItems.map((item) => (
          <button
            key={item.label}
            onClick={() => navigate(item.path)}
            className="px-6 py-2 bg-tracking hover:bg-green-700/80 text-zinc-700/70 border  rounded-lg transition-all duration-200 font-medium active:scale-95"
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}