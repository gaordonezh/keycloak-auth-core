import Keycloak from "keycloak-js";
import axios, { AxiosError, type AxiosInstance, type AxiosRequestConfig } from "axios";

interface AuthState {
  refreshPromise: Promise<string> | null;
  isLoggingIn: boolean;
}

interface RetryConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

const keycloak = new Keycloak({
  url: "http://localhost:8081",
  realm: "contable",
  clientId: "contable-client-id",
});

const flags: AuthState = {
  refreshPromise: null,
  isLoggingIn: false,
};

export async function initAuth() {
  await keycloak.init({
    onLoad: "login-required",
    checkLoginIframe: false,
  });
}

export async function getValidToken(): Promise<string> {
  if (!flags.refreshPromise) {
    flags.refreshPromise = keycloak
      .updateToken(30)
      .then(() => {
        if (!keycloak.token) {
          throw new Error("No token available");
        }
        return keycloak.token;
      })
      .catch((err) => {
        handleAuthError(err);
        throw err;
      })
      .finally(() => {
        flags.refreshPromise = null;
      });
  }

  return flags.refreshPromise;
}

function handleAuthError(err: unknown) {
  console.error("Auth error:", err);

  if (!flags.isLoggingIn) {
    flags.isLoggingIn = true;
    keycloak.login();
  }
}

export function logout() {
  keycloak.logout();
}

// EXTRA PART

const api: AxiosInstance = axios.create({
  baseURL: "/api",
  timeout: 10000,
});

// 🧩 REQUEST INTERCEPTOR
api.interceptors.request.use(
  async (config: any) => {
    const token = await getValidToken();

    if (config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
      config.headers["Content-Type"] = "application/json";
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// 🔁 RESPONSE INTERCEPTOR (retry en 401)
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as RetryConfig;

    if (!originalRequest) {
      return Promise.reject(error);
    }

    // Solo retry una vez
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        console.warn("401 detected, forcing token refresh");

        await keycloak.updateToken(0);

        const newToken = keycloak.token;

        if (newToken && originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
        }

        return api(originalRequest);
      } catch (refreshError) {
        keycloak.login();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);
