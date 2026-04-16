import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";
import dts from "vite-plugin-dts";

export default defineConfig({
  server: { port: 1000 },
  plugins: [
    react(),
    dts({
      entryRoot: "src",
      include: ["src/index.ts"],
      exclude: ["src/demo", "src/main.tsx"],
      insertTypesEntry: true,
      rollupTypes: true,
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "KeycloakAuthCore",
      fileName: (format) => `auth-library.${format}.js`,
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime", "keycloak-js"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "keycloak-js": "Keycloak",
        },
      },
    },
    sourcemap: true,
    emptyOutDir: true,
  },
});
