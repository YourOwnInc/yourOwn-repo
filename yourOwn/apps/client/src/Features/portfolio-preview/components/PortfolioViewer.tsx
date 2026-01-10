import { PortfolioRenderer } from "./PreviewRenderer";
import { useHydratedPage } from "../hooks/useHydratedPage";

// features/portfolio-preview/components/PortfolioViewer.tsx
export const PortfolioViewer = ({ layoutName }: { layoutName: string }) => {
  const { data, isLoading } = useHydratedPage(layoutName);

//   if (isLoading) return <SkeletonLoader />;
  
  // Directly render the server data
  return <PortfolioRenderer layout={data.layout} experiences={data.experienceLibrary} />;
};