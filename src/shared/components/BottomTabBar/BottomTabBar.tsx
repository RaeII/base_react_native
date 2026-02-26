import { Home, UserCircle2, Users } from "lucide-react-native";
import { FC, useEffect, useMemo, useState } from "react";
import { Platform, Pressable, View } from "react-native";
import { useRouter, usePathname } from "expo-router";

import { cn } from "@/shared/lib/utils";
import { useTheme } from "@/shared/hooks/useTheme";
import { theme } from "@/shared/styles/theme";
import type { BottomTabBarItem } from "@/shared/types/navigation.types";

interface BottomTabBarProps {
  tabs?: BottomTabBarItem[];
  className?: string;
  pathname?: string | null;
  onTabPress?: (route: string) => void;
}

const DEFAULT_TABS: BottomTabBarItem[] = [
  { key: "index", label: "Home", route: "/", icon: Home, matchMode: "exact" },
  { key: "users", label: "Usuarios", route: "/users", icon: Users, matchMode: "startsWith" },
  { key: "profile", label: "Perfil", route: "/profile", icon: UserCircle2, matchMode: "startsWith" },
];

const isTabActive = (pathname: string | null, tab: BottomTabBarItem): boolean => {
  if (!pathname) return false;
  if ((tab.matchMode ?? "exact") === "startsWith") {
    return pathname.startsWith(tab.route);
  }
  return pathname === tab.route;
};

export const BottomTabBar: FC<BottomTabBarProps> = ({
  tabs = DEFAULT_TABS,
  className,
  pathname = null,
  onTabPress,
}) => {
  const currentPathname = usePathname();
  const resolvedPathname = pathname ?? currentPathname;
  const [activeTabKey, setActiveTabKey] = useState<string | null>(tabs[0]?.key ?? null);
  const [pressedTabKey, setPressedTabKey] = useState<string | null>(null);
  const [isNavigating, setIsNavigating] = useState(false);
  const { isDark } = useTheme();
  const currentTheme = isDark ? theme.dark : theme.light;
  const mutedIconColor = `${currentTheme.foreground}80`;
  const router = useRouter();
  const activeKeyFromPathname = useMemo(
    () => tabs.find((tab) => isTabActive(resolvedPathname, tab))?.key ?? null,
    [resolvedPathname, tabs]
  );

  useEffect(() => {
    setActiveTabKey(activeKeyFromPathname);
    setIsNavigating(false);
  }, [activeKeyFromPathname]);

  const handlePressTab = (tab: BottomTabBarItem) => {
    if (isNavigating || tab.disabled || activeTabKey === tab.key) return;

    setActiveTabKey(tab.key);
    setIsNavigating(true);

    if (onTabPress) {
      onTabPress(tab.route);
      return;
    }

    router.replace(tab.route as any);
  };

  // Componente exclusivo para mobile: no web, a navegação principal usa Sidebar.
  if (Platform.OS === "web") {
    return null;
  }

  return (
    <View
      className={cn("z-50 bg-background", className)}
    >
      <View
        className="h-16 flex-row items-center justify-around bg-background px-2"
        style={{
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 10 },
          shadowOpacity: 0.4,
          shadowRadius: 8,
          elevation: 15,
        }}
      >
        {tabs.map((tab) => {
          const isActive = activeTabKey === tab.key;
          const isPressed = pressedTabKey === tab.key;
          const Icon = tab.icon;
          const iconColor = isActive || isPressed ? currentTheme.foreground : mutedIconColor;
          const isDisabled = tab.disabled || isNavigating;

          return (
            <Pressable
              key={tab.key}
              disabled={isDisabled}
              onPress={() => handlePressTab(tab)}
              onPressIn={() => setPressedTabKey(tab.key)}
              onPressOut={() => setPressedTabKey((prev) => (prev === tab.key ? null : prev))}
              className="mx-0.5 h-full flex-1 items-center justify-center"
              accessibilityRole="tab"
              accessibilityLabel={tab.label}
              accessibilityState={{ selected: isActive, disabled: isDisabled }}
            >
              <View
                className={cn(
                  "h-11 w-11 items-center justify-center rounded-xl border transition-colors",
                  isActive
                    ? "border-border/80 bg-foreground/10"
                    : "border-transparent bg-transparent",
                  isPressed && !isActive && "border-border/80 bg-foreground/10"
                )}
              >
                <Icon
                  size={22}
                  strokeWidth={2.25}
                  color={iconColor}
                />
              </View>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

export { DEFAULT_TABS as DEFAULT_BOTTOM_TAB_ITEMS };
