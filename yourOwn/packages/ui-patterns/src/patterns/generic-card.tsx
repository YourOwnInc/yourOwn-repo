import { PatternProps } from "../interfaces";

export const GenericCard = ({data, className}: PatternProps) => {
 return (
    <div className={`border p-4 shadow-sm ${className ?? ""}`}>
      <h3 className="text-xl font-bold">{data?.title ?? "Untitled"}</h3>
      {data?.organization && <div className="text-blue-600">{data.organization}</div>}
      <small className="text-gray-500">Pattern: CardUniversal</small>
    </div>
  );
}