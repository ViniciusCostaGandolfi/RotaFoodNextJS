import { IconTypeMap, SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";

export interface IPathItem {
    subTitle: string;
    path: string;
    icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & { muiName: string; };
}

export interface IPath {
    title: string;
    path: string;
    items?: IPathItem[];
}