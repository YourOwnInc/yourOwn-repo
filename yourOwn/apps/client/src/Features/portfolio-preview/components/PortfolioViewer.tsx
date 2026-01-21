import { PortfolioRenderer } from "./PreviewRenderer";
import { useHydratedPage } from "../hooks/useHydratedPage";
import {  PortfolioViewerProps} from "../types/portoflio.types";

import { SplitPaneShell } from "../shells/SplitPaneShell";
import { BaseShellProps } from "../types/shell.types";


// features/portfolio-preview/components/PortfolioViewer.tsx
export const PortfolioViewer = ({ contentData, manifest }: PortfolioViewerProps ) => {
  
console.log("data in viwer ", contentData );

  const shellProps: BaseShellProps = {
    contentData,
    manifest
  };
  // Directly render the server data
  return <SplitPaneShell {...shellProps} />;
};