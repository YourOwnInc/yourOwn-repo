import { HydratedLayoutData, ManifestData } from "./portoflio.types"


export interface BaseShellProps {
    contentData : HydratedLayoutData;
    manifest?:  ManifestData;
}