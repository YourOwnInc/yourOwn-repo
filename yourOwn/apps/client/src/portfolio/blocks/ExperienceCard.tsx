import { FC } from "react";
import { ExperienceProps } from "../types";

const ExperienceCard: FC<ExperienceProps> = ({ title, summary }) => {
  return (
    <article className="rounded-2xl p-4 shadow-md border bg-white/5">
      <header className="mb-2">
        <h3 className="text-lg font-semibold">{title}</h3>
        {summary && <p className="text-sm opacity-80">{summary}</p>}
      </header>
    </article>
  );
};

export default ExperienceCard;
