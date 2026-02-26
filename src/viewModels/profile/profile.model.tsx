import { useMemo } from "react";

import { useAuth } from "@/shared/contexts/AuthContext";
import { useTheme } from "@/shared/hooks/useTheme";

export const useProfileModel = () => {
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();

  const formatDate = (isoDate: string | null) => {
    if (!isoDate) {
      return "Nao informado";
    }

    return new Intl.DateTimeFormat("pt-BR", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(isoDate));
  };

  const userDetails = useMemo(
    () => [
      { label: "Nome de usuario", value: user?.username ?? "Nao informado" },
      { label: "E-mail", value: user?.email ?? "Nao informado" },
      { label: "Status", value: user?.is_active ? "Ativo" : "Inativo" },
      { label: "Perfil", value: user?.is_admin ? "Administrador" : "Usuario" },
      { label: "Ultimo acesso", value: formatDate(user?.last_login_at ?? null) },
      { label: "Conta criada em", value: formatDate(user?.created_at ?? null) },
    ],
    [user]
  );

  return {
    isDark,
    userDetails,
    toggleTheme,
    logout,
  };
};
