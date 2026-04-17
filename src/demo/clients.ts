import { createKeycloakAxiosInstance } from "../components/AuthenticationContext";

const apiClient = createKeycloakAxiosInstance({
  baseURL: "http://localhost:1001/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export { apiClient };
