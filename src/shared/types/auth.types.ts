import { User } from "./user.types";

// ─── Credenciais de Login ────────────────────────────────────────

export interface LoginCredentials {
  login: string;
  password: string;
}

// ─── Context de Autenticação ─────────────────────────────────────

export interface AuthContextType {
  /** Dados do usuário autenticado (null se não autenticado) */
  user: User | null;

  /** true enquanto verifica estado de autenticação inicial */
  loading: boolean;

  /** true durante a requisição de login */
  loginLoading: boolean;

  /** Realiza login com credenciais */
  login: (credentials: LoginCredentials) => Promise<void>;

  /** Realiza logout e limpa dados */
  logout: () => Promise<void>;

  /** Logout forçado (sessão expirada/inválida) */
  forceLogout: () => Promise<void>;

  /** Atualiza o estado do usuário localmente */
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}
