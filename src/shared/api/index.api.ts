import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { Platform } from "react-native";

// ─── Base URL ────────────────────────────────────────────────────

const baseURL = Platform.select({
  web: "http://localhost:3003/api",
  default: "http://192.168.100.139:3003/api",
});

// ─── Instância do Axios ──────────────────────────────────────────

export const api = axios.create({
  baseURL,
  timeout: 60_000,
  withCredentials: true, // Envia cookies automaticamente em todas as requests
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// ─── Tipos de Erro ───────────────────────────────────────────────

export interface ApiErrorResponse {
  message: string;
  issues?: Array<{ path: string; message: string }>;
}

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly statusCode: number,
    public readonly issues?: Array<{ path: string; message: string }>
  ) {
    super(message);

    this.name = new.target.name;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, new.target);
    }
  }
}

// ─── Callback de Autenticação Falha ──────────────────────────────

/**
 * Callback invocado quando uma requisição retorna 401/403
 * indicando que a sessão expirou ou é inválida.
 * Configurado pelo AuthContext para forçar logout.
 */
let onAuthenticationFailed: (() => void) | null = null;

export const setAuthenticationFailedCallback = (callback: () => void) => {
  onAuthenticationFailed = callback;
};

export const clearAuthenticationFailedCallback = () => {
  onAuthenticationFailed = null;
};

// ─── Interceptor de Request ──────────────────────────────────────

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => config,
  (error: AxiosError) => Promise.reject(error)
);

// ─── Interceptor de Response ─────────────────────────────────────

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError<ApiErrorResponse>) => {
    // Verifica se é erro de autenticação (sessão expirada/inválida)
    if (error.response) {
      const { status, config } = error.response;
      const isAuthEndpoint = config?.url?.includes("/auth/login");

      // Apenas dispara callback se NÃO for o próprio endpoint de login
      if ((status === 401 || status === 403) && !isAuthEndpoint) {
        if (onAuthenticationFailed) {
          onAuthenticationFailed();
        }
      }
    }

    return Promise.reject(handleApiError(error));
  }
);

// ─── Tratamento de Erro Padronizado ─────────────────────────────

function handleApiError(error: AxiosError<ApiErrorResponse>): ApiError {
  if (error.response) {
    // Erro com resposta do servidor (4xx, 5xx)
    const { status, data } = error.response;
    const message = data?.message ?? "Erro inesperado no servidor.";
    const issues = data?.issues;
    return new ApiError(message, status, issues);
  }

  if (error.request) {
    // Requisição feita, mas sem resposta (timeout, sem conexão)
    return new ApiError("Sem conexão com o servidor. Verifique sua internet.", 0);
  }

  // Erro ao montar a requisição
  return new ApiError(error.message ?? "Erro ao realizar a requisição.", -1);
}