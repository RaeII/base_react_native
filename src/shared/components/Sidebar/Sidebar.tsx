import { FC, useEffect, useMemo, useRef, useState } from "react";
import { Text, TouchableOpacity, View, useWindowDimensions } from "react-native";
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { router, usePathname } from "expo-router";
import { useColorScheme } from "nativewind";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Home,
  LogOut,
  Settings,
  type LucideIcon,
} from "lucide-react-native";

import { AnchoredModal } from "@/shared/components/AnchoredModal";
import { Button } from "@/shared/components/ui/Button";
import { useAuth } from "@/shared/contexts/AuthContext";
import type { User } from "@/shared/types/user.types";
import { cn, isWeb } from "@/shared/lib/utils";

type SidebarMenuItem = {
  key: string;
  label: string;
  icon: LucideIcon;
  href: string;
  adminOnly?: boolean;
};

const isAdmin = (user: User | null): boolean => Boolean(user?.is_admin);

interface SidebarProps {
  className?: string;
}

export const Sidebar: FC<SidebarProps> = ({ className }) => {
  if (!isWeb()) return null;

  const pathname = usePathname();
  const { user, logout } = useAuth();
  const { width: screenWidth } = useWindowDimensions();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";

  const menuItems: SidebarMenuItem[] = useMemo(
    () => [
      {
        key: "home",
        label: "Home",
        icon: Home,
        href: "/(authenticated)",
      },
    ],
    []
  );

  const adminMenuItems: SidebarMenuItem[] = useMemo(() => [], []);

  const userIsAdmin = isAdmin(user);

  const [isCollapsed, setIsCollapsed] = useState(() => screenWidth < 1024);
  const [isSettingsMenuOpen, setIsSettingsMenuOpen] = useState(false);
  const [activeSettingsOption, setActiveSettingsOption] = useState<"logout" | null>(null);
  const settingsButtonRef = useRef<any>(null);

  const expandedWidth = 228;
  const collapsedWidth = 76;
  const sidebarWidth = useSharedValue(isCollapsed ? collapsedWidth : expandedWidth);

  useEffect(() => {
    sidebarWidth.value = withTiming(isCollapsed ? collapsedWidth : expandedWidth, {
      duration: 220,
      easing: Easing.out(Easing.cubic),
    });
  }, [collapsedWidth, expandedWidth, isCollapsed, sidebarWidth]);

  const sidebarAnimatedStyle = useAnimatedStyle(() => ({
    width: sidebarWidth.value,
  }));

  const handleNavigate = (href: string) => {
    setIsSettingsMenuOpen(false);
    router.push(href as any);
  };

  const handleCloseSettingsMenu = () => {
    setIsSettingsMenuOpen(false);
    setActiveSettingsOption(null);
  };

  const handleToggleSettingsMenu = () => {
    if (isSettingsMenuOpen) {
      handleCloseSettingsMenu();
      return;
    }
    setActiveSettingsOption(null);
    setIsSettingsMenuOpen(true);
  };

  const handleSelectLogoutOption = () => {
    setActiveSettingsOption((prev) => (prev === "logout" ? null : "logout"));
  };

  const handleConfirmLogout = () => {
    handleCloseSettingsMenu();
    logout();
  };

  const isHomeActive = useMemo(() => {
    if (!pathname) return false;
    return pathname === "/(authenticated)" || pathname.startsWith("/(authenticated)/");
  }, [pathname]);

  const renderItem = (item: SidebarMenuItem, isActive: boolean) => {
    const isAdminItem = Boolean(item.adminOnly);
    const ItemIcon = item.icon;
    const iconColor = isActive
      ? isDark
        ? "hsl(210, 40%, 98%)"
        : "hsl(222, 47%, 11%)"
      : "hsl(215, 16%, 47%)";

    return (
      <TouchableOpacity
        key={item.key}
        activeOpacity={0.85}
        onPress={() => handleNavigate(item.href)}
        className={cn(
          "mt-1 flex-row items-center rounded-2xl px-2.5 py-2",
          isCollapsed ? "justify-center" : "gap-3",
          isActive ? "bg-muted/70" : "web:hover:bg-muted/40",
          isAdminItem && !isActive ? "border border-primary/20 bg-primary/5" : "border border-transparent"
        )}
        accessibilityRole="link"
        accessibilityLabel={item.label}
      >
        <View
          className={cn(
            "h-10 w-10 items-center justify-center rounded-xl",
            isActive ? "bg-card shadow-sm shadow-black/10" : "bg-transparent"
          )}
        >
          <ItemIcon size={18} color={iconColor} strokeWidth={2.2} />
        </View>

        {!isCollapsed ? (
          <View className="flex-1 flex-row items-center justify-between">
            <Text className="text-sm font-semibold text-foreground">{item.label}</Text>
            {isAdminItem ? (
              <View className="rounded-full border border-primary/25 bg-primary/10 px-2 py-0.5">
                <Text className="text-[10px] font-bold text-primary">ADMIN</Text>
              </View>
            ) : null}
          </View>
        ) : null}
      </TouchableOpacity>
    );
  };

  return (
    <Animated.View style={[{ height: "100%" }, sidebarAnimatedStyle]}>
      <View
        className={cn(
          "flex-1 border-r border-border/60 bg-background/95",
          "web:backdrop-blur supports-[backdrop-filter]:web:bg-background/80",
          className
        )}
      >
        <AnchoredModal
          isOpen={isSettingsMenuOpen}
          onClose={handleCloseSettingsMenu}
          anchorRef={settingsButtonRef}
          containerClassName="w-60 overflow-visible"
          placement="top-start"
        >
          <View className="relative">
            <View className="rounded-2xl border border-border/70 bg-card/60 p-2">
              <Text className="px-2 pb-2 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                Opcoes
              </Text>

              <TouchableOpacity
                activeOpacity={0.85}
                onPress={handleSelectLogoutOption}
                className={cn(
                  "flex-row items-center gap-2 rounded-xl border px-3 py-2.5",
                  activeSettingsOption === "logout"
                    ? "border-destructive/30 bg-destructive/10"
                    : "border-border/70 bg-background web:hover:bg-muted/40"
                )}
                accessibilityRole="button"
                accessibilityLabel="Sair"
              >
                <LogOut size={15} color="hsl(0, 72%, 51%)" strokeWidth={2.2} />
                <Text className="text-xs font-semibold text-foreground">Sair</Text>
              </TouchableOpacity>
            </View>

            {activeSettingsOption === "logout" ? (
              <View className="absolute left-[calc(100%+0.5rem)] top-0 w-64 rounded-2xl border border-destructive/25 bg-card p-3 shadow-lg shadow-black/15">
                <Text className="text-sm font-medium text-foreground">Deseja encerrar sua sessão?</Text>
                <Text className="mt-1 text-xs text-muted-foreground">
                  Você precisará fazer login novamente para continuar.
                </Text>

                <View className="mt-3 flex-row justify-end gap-2">
                  <Button
                    label="Cancelar"
                    variant="outline"
                    size="sm"
                    className="rounded-full px-4"
                    labelClasses="text-xs font-semibold"
                    onPress={() => setActiveSettingsOption(null)}
                  />

                  <Button
                    label="Confirmar"
                    variant="destructive"
                    size="sm"
                    className="rounded-full px-4"
                    labelClasses="text-xs font-semibold"
                    onPress={handleConfirmLogout}
                  />
                </View>
              </View>
            ) : null}
          </View>
        </AnchoredModal>

        <View className={cn("px-3 pb-3 pt-4", isCollapsed ? "items-center" : "items-end")}>
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => setIsCollapsed((prev) => !prev)}
              className="h-10 w-10 items-center justify-center rounded-2xl border border-border bg-card shadow-sm shadow-black/10"
              accessibilityLabel={isCollapsed ? "Expandir sidebar" : "Recolher sidebar"}
            >
              {isCollapsed ? (
                <ChevronRight size={18} color="hsl(215, 16%, 47%)" strokeWidth={2.3} />
              ) : (
                <ChevronLeft size={18} color="hsl(215, 16%, 47%)" strokeWidth={2.3} />
              )}
            </TouchableOpacity>
        </View>

        <View className="flex-1 px-2">
          {menuItems.map((item) => renderItem(item, item.key === "home" ? isHomeActive : false))}

          {userIsAdmin && adminMenuItems.length > 0 ? (
            <View className="mt-4">
              <View className={cn("mx-2 mb-2 flex-row items-center justify-between")}>
                {!isCollapsed ? (
                  <Text className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    Admin
                  </Text>
                ) : null}
                <View className="h-px flex-1 bg-border/60" />
              </View>

              {adminMenuItems.map((item) => renderItem({ ...item, adminOnly: true }, false))}
            </View>
          ) : null}
        </View>

        <View className={cn("border-t border-border/60 px-3 pb-4 pt-3", isCollapsed ? "items-center" : "")}>
          <TouchableOpacity
            ref={settingsButtonRef}
            activeOpacity={0.85}
            onPress={handleToggleSettingsMenu}
            className={cn(
              "flex-row items-center gap-1.5 rounded-full border border-border bg-card px-3 py-2",
              isCollapsed ? "justify-center px-0 w-12" : "w-full justify-between",
              "web:hover:bg-muted/40"
            )}
            accessibilityLabel="Configurações"
          >
            <View className={cn("flex-row items-center", isCollapsed ? "" : "gap-2")}>
              <Settings size={16} color="hsl(215, 16%, 47%)" strokeWidth={2.2} />
              {!isCollapsed ? (
                <Text className="text-xs font-semibold text-foreground">Configurações</Text>
              ) : null}
            </View>

            {!isCollapsed ? (
              isSettingsMenuOpen ? (
                <ChevronUp size={14} color="hsl(215, 16%, 47%)" strokeWidth={2.4} />
              ) : (
                <ChevronDown size={14} color="hsl(215, 16%, 47%)" strokeWidth={2.4} />
              )
            ) : null}
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );
};

