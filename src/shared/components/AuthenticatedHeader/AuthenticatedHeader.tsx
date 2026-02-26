import { FC, useRef, useState } from "react";
import { Text, TouchableOpacity, View, useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import { AnchoredModal } from "@/shared/components/AnchoredModal";
import { ThemeToggle } from "@/shared/components/ThemeToggle";
import { Button } from "@/shared/components/ui/Button";
import { useAuth } from "@/shared/contexts/AuthContext";
import { useTheme } from "@/shared/hooks/useTheme";

export const AuthenticatedHeader: FC = () => {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const { logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const [isLogoutMenuOpen, setIsLogoutMenuOpen] = useState(false);
  const logoutButtonRef = useRef<any>(null);

  const isDesktop = width >= 1024;

  const handleConfirmLogout = () => {
    setIsLogoutMenuOpen(false);
    logout();
  };

  const handleCloseLogoutMenu = () => {
    setIsLogoutMenuOpen(false);
  };

  const handleToggleLogoutMenu = () => {
    if (isLogoutMenuOpen) {
      handleCloseLogoutMenu();
      return;
    }
    setIsLogoutMenuOpen(true);
  };

  return (
    <View
      className="relative border-b border-border/60 bg-background/95 p-2 px-4 z-50"
    >
      <AnchoredModal
        isOpen={isLogoutMenuOpen}
        onClose={handleCloseLogoutMenu}
        anchorRef={logoutButtonRef}
        containerClassName="w-60"
      >
        <Text className="text-sm font-medium text-foreground">Deseja encerrar sua sessao?</Text>
        <Text className="mt-1 text-xs text-muted-foreground">
          Voce precisara fazer login novamente para continuar.
        </Text>

        <View className="mt-3 flex-row justify-end gap-2">
          <Button
            label="Cancelar"
            variant="outline"
            size="sm"
            className="rounded-full px-4"
            labelClasses="text-xs font-semibold"
            onPress={handleCloseLogoutMenu}
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
      </AnchoredModal>

      <View
        className={"z-20 w-full max-w-screen-2xl self-center flex-row items-center justify-end gap-3"}
      >
        <View className={"flex-row items-center gap-3"}>
          <ThemeToggle isDark={isDark} onToggle={toggleTheme} />

          <View className="relative">
            <TouchableOpacity
              ref={logoutButtonRef}
              activeOpacity={0.85}
              onPress={handleToggleLogoutMenu}
              className="flex-row items-center gap-1.5 rounded-full border border-border bg-card px-3 py-2"
            >
              <Ionicons name="log-out-outline" size={16} color="hsl(0, 70%, 50%)" />
              <Text className="text-xs font-semibold text-foreground">Sair</Text>
              <Ionicons
                name={isLogoutMenuOpen ? "chevron-up" : "chevron-down"}
                size={14}
                color="hsl(215, 16%, 47%)"
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};
