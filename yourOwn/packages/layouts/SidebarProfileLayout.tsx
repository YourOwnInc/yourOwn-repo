// packages/layouts/src/blueprints/SidebarProfileLayout.tsx
export const SidebarProfileLayout: React.FC<{ slots: Record<string, React.ReactNode> }> = ({ slots }) => {
  return (
    <div className="flex flex-col h-full bg-card p-6 gap-8 border-r">
      <section className="identity-zone flex flex-col items-center text-center gap-4">
        {slots["identity"]}
      </section>

      {/* NEW: This slot acts as the "Anchor" where the Shell will inject the Nav */}
      <div id="shell-nav-anchor" className="navigation-zone min-h-[200px] flex-grow py-8">
        {slots["navigation"]}
      </div>

      <footer className="socials-zone border-t pt-4 flex justify-center gap-4 bg-[var()]">
        {slots["socials"]}
      </footer>
    </div>
  );
};