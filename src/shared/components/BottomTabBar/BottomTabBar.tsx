import { router, usePathname } from "expo-router";
import { Home } from "lucide-react-native";
import { FC, useEffect, useMemo, useState } from "react";
import { Platform, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { cn } from "@/shared/lib/utils";
import type { BottomTabBarItem } from "@/shared/types/navigation.types";

interface BottomTabBarProps {
  tabs?: BottomTabBarItem[];
  className?: string;
}

const DEFAULT_TABS: BottomTabBarItem[] = [
  { key: "index", label: "Home", route: "/", icon: Home, matchMode: "exact" },
];

const isTabActive = (pathname: string | null, tab: BottomTabBarItem): boolean => {
  if (!pathname) return false;
  if ((tab.matchMode ?? "exact") === "startsWith") {
    return pathname.startsWith(tab.route);
  }
  return pathname === tab.route;
};

export const BottomTabBar: FC<BottomTabBarProps> = ({ tabs = DEFAULT_TABS, className }) => {
  const pathname = usePathname();
  const insets = useSafeAreaInsets();
  const [activeTabKey, setActiveTabKey] = useState<string | null>(tabs[0]?.key ?? null);
  const [isNavigating, setIsNavigating] = useState(false);

  const activeKeyFromPathname = useMemo(
    () => tabs.find((tab) => isTabActive(pathname, tab))?.key ?? null,
    [pathname, tabs]
  );

  useEffect(() => {
    setActiveTabKey(activeKeyFromPathname);
    setIsNavigating(false);
  }, [activeKeyFromPathname]);

  const handlePressTab = (tab: BottomTabBarItem) => {
    if (isNavigating || tab.disabled || activeTabKey === tab.key) return;

    setActiveTabKey(tab.key);
    setIsNavigating(true);
    router.push(tab.route as any);
  };

  // Componente exclusivo para mobile: no web, a navegação principal usa Sidebar.
  if (Platform.OS === "web") {
    return null;
  }

  return (
    <View
      pointerEvents="box-none"
      className={cn("absolute inset-x-0 bottom-0 z-50", className)}
      style={{ }}
    >
      <View className="h-16 flex-row items-center justify-around border-y border-border/70 bg-background px-2">
        {tabs.map((tab) => {
          const isActive = activeTabKey === tab.key;
          const Icon = tab.icon;

          return (
            <TouchableOpacity
              key={tab.key}
              activeOpacity={0.86}
              disabled={tab.disabled || isNavigating}
              onPress={() => handlePressTab(tab)}
              className="mx-0.5 h-full flex-1 items-center justify-center"
              accessibilityRole="tab"
              accessibilityLabel={tab.label}
              accessibilityState={{ selected: isActive, disabled: tab.disabled || isNavigating }}
            >
              <View
                className={cn(
                  "h-9 w-9 items-center justify-center rounded-xl",
                  isActive ? "bg-primary" : "bg-transparent"
                )}
              >
                <Icon
                  size={19}
                  strokeWidth={2.25}
                  color={isActive ? "hsl(0, 0%, 100%)" : "hsl(215, 16%, 47%)"}
                />
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export { DEFAULT_TABS as DEFAULT_BOTTOM_TAB_ITEMS };
