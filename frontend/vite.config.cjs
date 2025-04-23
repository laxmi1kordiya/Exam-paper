import react from "@vitejs/plugin-react";
import reactRefresh from "@vitejs/plugin-react-refresh";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";

const path = require("path");

const PORT = process.env.PORT || 8081;
const VitePort = 5173;
const APP_URL = "https://localhost:4200";

const proxyOptions = {
  target: `http://127.0.0.1:${PORT}`,
  changeOrigin: false,
  secure: true,
  ws: false,
};

const host = APP_URL ? APP_URL.replace(/https?:\/\//, "") : "localhost";
let hmrConfig;
// if (host === "localhost") {
//  hmrConfig = {
//   protocol: "ws",
//   host: "localhost",
//   port: 64999,
//   clientPort: 64999,
//  };
// } else {
//  hmrConfig = {
//   protocol: "ws",
//   host: "localhost",
//   port: 64999,
//   clientPort: 64999,
//  };
// }

export default defineConfig({
  define: {
    APP_URL: JSON.stringify(APP_URL),
    appOrigin: JSON.stringify(APP_URL.replace(/https:\/\//, "")),
  },
  plugins: [react() /* , reactRefresh() */], // Using only @vitejs/plugin-react as it includes Fast Refresh
  build: {
    outDir: "../dist/client/",
    sourcemap: true,
  },
  root: dirname(fileURLToPath(import.meta.url)),
  resolve: {
    preserveSymlinks: true,
    alias: [{ find: "@", replacement: path.resolve(__dirname, "./") }],
  },
  server: {
    host: "localhost",
    port: VitePort,
    hmr: true, // Keeping it simple, Vite handles the details
    // hmr: hmrConfig, // Commenting out the custom hmrConfig
    proxy: {
      // Routes are kept separate on purpose
      // "^/uploads(/|(\\?.*)?$)": proxyOptions,
      // "^/auth(/|(\\?.*)?$)": proxyOptions,
      "^/apps(/|(\\?.*)?$)": proxyOptions,
      // "^/proxy_route(/|(\\?.*)?$)": proxyOptions,
      // "^/graphql(/|(\\?.*)?$)": proxyOptions,
      // "^/webhooks(/|(\\?.*)?$)": proxyOptions,
      // "^/gdpr(/|(\\?.*)?$)": proxyOptions,
      "/api": "http://localhost:8081",
    },
  },
});

// proxy routes ARE clumsy, but a future update will refactor into a single route
// like /apps/* so everything works as expected.
// I am working on `create-shop-app` project anyways where I deal with this
// so just 🐻 with me on this, but it's production ready, so don't worry about this
// On a future date I'll push out a migration guide because the entire structure will change
// to make the developer experience better.
// https://github.com/kinngh/create-shop-app
