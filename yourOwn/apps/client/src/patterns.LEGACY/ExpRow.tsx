import { FC } from "react";
const ExpRow: FC<{ title: string; dates?: string }> = ({ title, dates }) => (
  <section>
    <div>{title}{dates ? ` — ${dates}` : ""}</div>
  </section>
);
export default ExpRow;
