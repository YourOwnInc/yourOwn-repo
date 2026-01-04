import { FC } from "react";
const ExpCard: FC<{ title: string; summary?: string }> = ({ title, summary }) => (
  <section>
    <h3>{title}</h3>
    {summary ? <p>{summary}</p> : null}
  </section>
);
export default ExpCard;
