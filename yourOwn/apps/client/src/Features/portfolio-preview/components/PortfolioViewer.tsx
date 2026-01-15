import { PortfolioRenderer } from "./PreviewRenderer";
import { useHydratedPage } from "../hooks/useHydratedPage";
import { PortfolioModel , HydratedLayoutDTO} from "../../../domain/types";

interface PortfolioViewerProps {
  data: HydratedLayoutDTO;
}

// features/portfolio-preview/components/PortfolioViewer.tsx
export const PortfolioViewer = ({ data }: PortfolioViewerProps ) => {
  
console.log("data in viwer ", data );
//   if (isLoading) return <SkeletonLoader />;
  
  // Directly render the server data
  return <PortfolioRenderer {...data} />;
};