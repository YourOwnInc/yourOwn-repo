import { PortfolioRenderer } from "./PreviewRenderer";
import { useHydratedPage } from "../hooks/useHydratedPage";
import { PortfolioModel } from "../../../domain/types";

interface PortfolioViewerProps {
  data: PortfolioModel;
}

// features/portfolio-preview/components/PortfolioViewer.tsx
export const PortfolioViewer = ({ data }: PortfolioViewerProps ) => {
  
console.log("data in viwer ", data );
//   if (isLoading) return <SkeletonLoader />;
  
  // Directly render the server data
  return <PortfolioRenderer layout={data.layout} experiences={data.experiences} />;
};