import { PatternProps } from "../interfaces";

export const HeroBasic = ({data, className}: PatternProps) => {
    <div className={`bg-blue-100 p-10 ${className}`}>
    <h1 className="text-4xl font-bold">{data.title}</h1>
    <p>{data.summary}</p>
    <small className="text-gray-500">Pattern: HeroBasic</small>
  </div>
}