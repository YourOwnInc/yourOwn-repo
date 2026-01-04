import { PatternProps } from "../interfaces";

export const DefaultPattern = ({data, className}: PatternProps) => {
   <div className="border border-red-500 p-4 text-red-500">
      Unknown Pattern for: {data.title}
    </div>
}