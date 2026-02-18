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


// ─── Interceptor de Request ──────────────────────────────────────

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Futuramente: injetar token de autenticação aqui
    // const token = await getToken();
    // if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

// ─── Interceptor de Response ─────────────────────────────────────

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError<ApiErrorResponse>) => {
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