import { api } from "../index.api";
import type {
  User,
  PaginatedResponse,
  CreateUserPayload,
  UpdateUserPayload,
  UserResponse,
  CreateUserResponse,
} from "@/shared/types/user.types";

// ─── Rotas de Usuário ────────────────────────────────────────────

/** GET /user — Lista paginada de usuários (requer admin) */
const getAllUsers = async (page: number | null, perPage: number | null) =>{
  const response = await api.get<PaginatedResponse<User>>("/user", {
    params: {
      page,
      perPage,
    },
  });
 
  return response.data
}

/** GET /user/:id — Busca usuário por ID (requer admin) */
const getUserById = async (id: number) =>{
  const response = await api.get<UserResponse>(`/user/${id}`);
  return response.data
}

/** POST /user — Cria novo usuário (requer admin) */
const createUser = async (data: CreateUserPayload) =>{
  const response = await api.post<CreateUserResponse>("/user", data);
  return response.data
}

/** PUT /user/:id — Atualiza usuário existente (requer admin) */
const updateUser = async (id: number, data: UpdateUserPayload) =>{
  const response = await api.put<UserResponse>(`/user/${id}`, data);
  return response.data
}

/** DELETE /user/:id — Desativa usuário (soft delete, requer admin) */
const deleteUser = async (id: number) =>{
  const response = await api.delete<{ message: string }>(`/user/${id}`);
  return response.data
}

export {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};

