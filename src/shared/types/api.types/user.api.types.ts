import { User } from "../user.types";

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface UserResponse {
  data: User;
}

export interface CreateUserResponse {
  data: {
    id: number;
    username: string;
    email: string | null;
    is_active: boolean;
    is_admin: boolean;
  };
}