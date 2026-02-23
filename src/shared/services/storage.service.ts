import AsyncStorage from "@react-native-async-storage/async-storage";
import type { User } from "@/shared/types/user.types";

// ─── Chaves de Armazenamento ─────────────────────────────────────

const STORAGE_KEYS = {
  USER_DATA: "@base_app_user_data",
} as const;

// ─── Serviço de Armazenamento ────────────────────────────────────

/**
 * Serviço responsável por persistir dados do usuário localmente.
 *
 * Nota: o token JWT é gerenciado via cookie httpOnly pelo backend,
 * portanto NÃO armazenamos o token aqui. Apenas os dados do usuário
 * são persistidos para manter estado de autenticação entre sessões.
 */
export const StorageService = {
  // ─── Dados do Usuário ────────────────────────────────────────

  /** Persiste dados do usuário no storage local */
  async setUserData(userData: User): Promise<void> {
    try {
      await AsyncStorage.setItem(
        STORAGE_KEYS.USER_DATA,
        JSON.stringify(userData)
      );
    } catch (error) {
      console.error("Erro ao salvar dados do usuário:", error);
      throw new Error("Falha ao salvar dados do usuário");
    }
  },

  /** Recupera dados do usuário do storage local */
  async getUserData(): Promise<User | null> {
    try {
      const raw = await AsyncStorage.getItem(STORAGE_KEYS.USER_DATA);
      return raw ? (JSON.parse(raw) as User) : null;
    } catch (error) {
      console.error("Erro ao recuperar dados do usuário:", error);
      return null;
    }
  },

  /** Remove dados do usuário do storage local */
  async removeUserData(): Promise<void> {
    try {
      await AsyncStorage.removeItem(STORAGE_KEYS.USER_DATA);
    } catch (error) {
      console.error("Erro ao remover dados do usuário:", error);
    }
  },

  // ─── Utilitários ─────────────────────────────────────────────

  /** Limpa todos os dados de autenticação */
  async clearAuthData(): Promise<void> {
    try {
      await AsyncStorage.multiRemove([STORAGE_KEYS.USER_DATA]);
    } catch (error) {
      console.error("Erro ao limpar dados de autenticação:", error);
    }
  },

  /** Verifica se há dados de autenticação persistidos */
  async isAuthenticated(): Promise<boolean> {
    try {
      const userData = await this.getUserData();
      return userData !== null;
    } catch (error) {
      console.error("Erro ao verificar autenticação:", error);
      return false;
    }
  },
};
