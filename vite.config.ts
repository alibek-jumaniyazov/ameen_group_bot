import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  server: {
    allowedHosts: ["cdaa2c33df2d.ngrok-free.app", "turaevkozimxon.uz"],
    proxy: {
      "/api": {
        target: "https://api.turaevkozimxon.uz",
      },
    },
  },

  plugins: [react(), tailwindcss()],
});
