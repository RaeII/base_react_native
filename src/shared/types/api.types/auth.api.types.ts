import { User } from "../user.types";

// ─── Resposta do Login ───────────────────────────────────────────

/** Resposta da rota POST /auth/login */
export interface LoginResponse {
  data: User;
  expiresIn: number;
}
