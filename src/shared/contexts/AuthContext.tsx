import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { router } from "expo-router";

import { login as apiLogin } from "@/shared/api/auth/auth.api";
import {
  setAuthenticationFailedCallback,
  clearAuthenticationFailedCallback,
} from "@/shared/api/index.api";
import { StorageService } from "@/shared/services/storage.service";
import type { AuthContextType, LoginCredentials } from "@/shared/types/auth.types";
import type { User } from "@/shared/types/user.types";

// ─── Context ─────────────────────────────────────────────────────

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Hook para acessar o contexto de autenticação.
 * Deve ser usado dentro de um `AuthProvider`.
 */
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};

// ─── Provider ────────────────────────────────────────────────────

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [loginLoading, setLoginLoading] = useState(false);

  /**
   * Verifica o estado de autenticação ao iniciar o app.
   * Recupera dados do usuário do AsyncStorage para evitar
   * flash da tela de login.
   */
  const checkAuthState = useCallback(async () => {
    try {
      const startTime = Date.now();
      const minLoadingTime = 400; // Evita flash de tela

      const isAuth = await StorageService.isAuthenticated();
      if (isAuth) {
        const userData = await StorageService.getUserData();
        if (userData) {
          setUser(userData);
        } else {
          await StorageService.clearAuthData();
        }
      }

      // Garante tempo mínimo de loading para UX suave
      const elapsed = Date.now() - startTime;
      if (elapsed < minLoadingTime) {
        await new Promise((resolve) => setTimeout(resolve, minLoadingTime - elapsed));
      }
    } catch (error) {
      console.error("Erro ao verificar estado de autenticação:", error);
      await StorageService.clearAuthData();
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Logout forçado — invocado quando o interceptor do axios
   * detecta uma resposta 401/403 (sessão expirada).
   */
  const forceLogout = useCallback(async () => {
    try {
      await StorageService.clearAuthData();
      setUser(null);
      router.replace("/(auth)/Login");
    } catch (error) {
      console.error("Erro durante logout forçado:", error);
      setUser(null);
      router.replace("/(auth)/Login");
    }
  }, []);

  // ─── Inicialização ───────────────────────────────────────────

  useEffect(() => {
    checkAuthState();

    // Registra callback para forçar logout em falhas de autenticação
    setAuthenticationFailedCallback(() => {
      forceLogout();
    });

    return () => {
      clearAuthenticationFailedCallback();
    };
  }, [checkAuthState, forceLogout]);

  // ─── Ações ───────────────────────────────────────────────────

  /**
   * Realiza login com credenciais.
   * O token JWT é automaticamente armazenado como cookie httpOnly
   * pelo backend. Apenas os dados do usuário são persistidos localmente.
   */
  const login = useCallback(async (credentials: LoginCredentials) => {
    setLoginLoading(true);
    try {
      const response = await apiLogin(credentials);

      // Persiste dados do usuário no AsyncStorage
      await StorageService.setUserData(response.data);

      // Atualiza estado reativo
      setUser(response.data);
    } catch (error) {
      throw error;
    } finally {
      setLoginLoading(false);
    }
  }, []);

  /**
   * Realiza logout manual.
   * Limpa dados locais e redireciona para tela de login.
   */
  const logout = useCallback(async () => {
    try {
      await StorageService.clearAuthData();
      setUser(null);
      router.replace("/(auth)/Login");
    } catch (error) {
      console.error("Erro durante logout:", error);
      setUser(null);
      router.replace("/(auth)/Login");
    }
  }, []);

  // ─── Value ───────────────────────────────────────────────────

  const value: AuthContextType = {
    user,
    loading,
    loginLoading,
    login,
    logout,
    forceLogout,
    setUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
