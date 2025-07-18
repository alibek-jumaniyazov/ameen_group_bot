import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  server: {
    allowedHosts: ["cdaa2c33df2d.ngrok-free.app"],
    proxy: {
      "/api": {
        target: "http://localhost:3000",
      },
    },
  },

  plugins: [react(), tailwindcss()],
});
