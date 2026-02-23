import { api } from "../index.api";
import type { LoginCredentials } from "@/shared/types/auth.types";
import type { LoginResponse } from "@/shared/types/api.types/auth.api.types";

// ─── Rotas de Autenticação ───────────────────────────────────────

/**
 * POST /auth/login
 *
 * Autentica o usuário com login + senha.
 * O backend retorna os dados do usuário no body e
 * seta o JWT como cookie httpOnly (`token_access`).
 */
const login = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>("/auth/login", credentials);
  return response.data;
};

export { login };
