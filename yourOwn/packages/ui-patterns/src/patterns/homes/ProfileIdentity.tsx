// packages/ui-patterns/src/patterns/ProfileIdentity.tsx
import image from "../../../../../public/IMG_5248.jpg"
export const ProfileIdentity = ({ data }: { data: any }) => (
  <div className="profile-identity">
    <div className="w-32 h-32 rounded-full bg-muted overflow-hidden mx-auto mb-4 border-2 border-primary">
      <img src={image} alt={data.name} className="object-cover" />
    </div>
    <h1 className="text-xl font-bold bg-[var(--nav-text-color)]">{data.displayName}</h1>
    <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
      {data.bio}
    </p>
  </div>
);