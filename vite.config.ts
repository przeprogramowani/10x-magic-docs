import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 3000,
    proxy: {
      "/v1": {
        target: "https://api.anthropic.com",
        changeOrigin: true,
        secure: true,
        headers: {
          "x-anthropic-api-key": process.env.VITE_ANTHROPIC_API_KEY || "",
          "anthropic-dangerous-direct-browser-access": "true",
        },
      },
    },
  },
  plugins: [tailwindcss(), react()],
});
