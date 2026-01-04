import { PatternProps } from "../interfaces";

export const GenericCard = ({data, className}: PatternProps) => {
 return (
    <div className={`border p-4 shadow-sm ${className ?? ""}`}>
      <h3 className="text-xl ">{data?.title ?? "Untitled"}</h3>
      {data?.organization && <div className="text-black">{data.organization}</div>}
      <small className="text-gray-500">Pattern: Generic Card</small>
    </div>
  );
}