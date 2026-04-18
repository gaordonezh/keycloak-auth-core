import { createKeycloakAxiosInstance } from "../components/AuthenticationContext";

const apiClient = createKeycloakAxiosInstance({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export { apiClient };
