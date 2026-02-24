import type { LucideIcon } from "lucide-react-native";

export type BottomTabRouteMatchMode = "exact" | "startsWith";

export interface BottomTabBarItem {
  key: string;
  label: string;
  route: string;
  icon: LucideIcon;
  disabled?: boolean;
  matchMode?: BottomTabRouteMatchMode;
}
