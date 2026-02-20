// ─── Entidade ────────────────────────────────────────────────────

export interface User {
  id: number;
  username: string;
  email: string | null;
  is_active: boolean;
  is_admin: boolean;
  last_login_at: string | null; // ISO string (Date serializado pelo JSON)
  created_at: string;           // ISO string
  updated_at: string | null;    // ISO string
}

// ─── Payloads de Request ─────────────────────────────────────────

export interface CreateUserPayload {
  username: string;
  password: string;
  email?: string;
  is_active?: boolean;
  is_admin?: boolean;
}

export interface UpdateUserPayload {
  username?: string;
  email?: string;
  password?: string;
  is_active?: boolean;
  is_admin?: boolean;
}


