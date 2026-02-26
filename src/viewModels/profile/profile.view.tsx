import { FC, useRef, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { AnchoredModal } from "@/shared/components/AnchoredModal";
import { ThemeToggle } from "@/shared/components/ThemeToggle";
import { Button } from "@/shared/components/ui/Button";
import { useProfileModel } from "./profile.model";

export const ProfileView: FC<ReturnType<typeof useProfileModel>> = ({
  isDark,
  userDetails,
  toggleTheme,
  logout,
}) => {
  const [isLogoutMenuOpen, setIsLogoutMenuOpen] = useState(false);
  const logoutButtonRef = useRef<any>(null);

  const handleCloseLogoutMenu = () => {
    setIsLogoutMenuOpen(false);
  };

  const handleConfirmLogout = () => {
    handleCloseLogoutMenu();
    logout();
  };

  const handleToggleLogoutMenu = () => {
    if (isLogoutMenuOpen) {
      handleCloseLogoutMenu();
      return;
    }
    setIsLogoutMenuOpen(true);
  };

  return (
    <View className="flex-1 bg-background p-4 web:p-6">
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

      <View className="w-full max-w-5xl self-center gap-4">
        <View className="rounded-3xl border border-border/70 p-5 web:p-6">
          <Text className="text-2xl font-bold text-foreground">Perfil</Text>
          <Text className="mt-1 text-sm text-muted-foreground">
            Visualizacao dos dados da conta e configuracoes da aplicacao.
          </Text>
        </View>

        <View className="rounded-3xl border border-border/70 p-5 web:p-6">
          <Text className="text-base font-semibold text-foreground">Informacoes da conta</Text>
          <View className="mt-4 gap-3">
            {userDetails.map((detail) => (
              <View
                key={detail.label}
                className="rounded-2xl border border-border/60 px-4 py-3 web:flex-row web:items-center web:justify-between"
              >
                <Text className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  {detail.label}
                </Text>
                <Text className="mt-1 text-sm font-medium text-foreground web:mt-0">
                  {detail.value}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <View className="rounded-3xl border border-border/70 p-5 web:p-6">
          <Text className="text-base font-semibold text-foreground">Configuracoes</Text>

          <View className="mt-4 gap-3">
            <View className="flex-row items-center justify-between rounded-2xl border border-border/60 px-4 py-3">
              <View>
                <Text className="text-sm font-semibold text-foreground">Tema da interface</Text>
                <Text className="mt-1 text-xs text-muted-foreground">
                  Alterne entre os modos claro e escuro.
                </Text>
              </View>
              <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
            </View>

            <View className="rounded-2xl border border-destructive/30 bg-destructive/5 px-4 py-3">
              <View className="flex-row items-center justify-between">
                <View className="mr-2 flex-1">
                  <Text className="text-sm font-semibold text-foreground">Sair da aplicacao</Text>
                  <Text className="mt-1 text-xs text-muted-foreground">
                    Encerra sua sessao atual com seguranca.
                  </Text>
                </View>
                <TouchableOpacity
                  ref={logoutButtonRef}
                  activeOpacity={0.85}
                  onPress={handleToggleLogoutMenu}
                  className="flex-row items-center gap-1.5 rounded-full border border-border bg-card px-3 py-2"
                >
                  <Ionicons name="log-out-outline" size={16} color="hsl(0, 70%, 50%)" />
                  <Text className="text-xs font-semibold text-foreground">Sair</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};
