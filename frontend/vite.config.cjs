import react from "@vitejs/plugin-react";
import reactRefresh from "@vitejs/plugin-react-refresh";
import "dotenv/config";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";

const path = require("path");

const PORT = process.env.PORT || 8081;
const VitePort = 5173;

const proxyOptions = {
  target: `http://127.0.0.1:${PORT}`,
  changeOrigin: false,
  secure: true,
  ws: false,
};
const host = process.env.APP_URL ? process.env.APP_URL.replace(/https?:\/\//, "") : "localhost";
let hmrConfig;
if (host === "localhost") {
  hmrConfig = {
    protocol: "ws",
    host: "localhost",
    port: 64999,
    clientPort: 64999,
  };
} else {
  hmrConfig = {
    protocol: "ws",
    host: "localhost",
    port: 64999,
    clientPort: 64999,
  };
}

export default defineConfig({
  define: {
    "process.env.CRISP_WEBSITE_ID": JSON.stringify(process.env.CRISP_WEBSITE_ID),
    "process.env.SENTRY_DNS_WEB": JSON.stringify(process.env.SENTRY_DNS_WEB),
    "process.env.REACT_APP_GA_ID": JSON.stringify(process.env.REACT_APP_GA_ID),
    "process.env.GOOGLE_FONT_KEY": JSON.stringify(process.env.GOOGLE_FONT_KEY),
    "process.env.APP_URL": JSON.stringify(process.env.APP_URL),
    "process.env.CSTOMERLY_WEBSITE_ID": JSON.stringify(process.env.CSTOMERLY_WEBSITE_ID),
    "process.env.ENV": JSON.stringify(process.env.ENV),
    appOrigin: JSON.stringify(process.env.APP_URL.replace(/https:\/\//, "")),
    "process.env.CONNECT_LIVE_DATABASE_LOCAL": JSON.stringify(process.env.CONNECT_LIVE_DATABASE_LOCAL),
    "process.env.HIDE_CRISP_LOGO": JSON.stringify(process.env.HIDE_CRISP_LOGO),
    "process.env.VULTR_BUCKETNAME": JSON.stringify(process.env.VULTR_BUCKETNAME),
    "process.env.VULTR_ENDPOINT": JSON.stringify(process.env.VULTR_ENDPOINT),
    "process.env.VULTR_ACCESSKEY": JSON.stringify(process.env.VULTR_ACCESSKEY),
    "process.env.VULTR_SECRET_ACCESSKEY": JSON.stringify(process.env.VULTR_SECRET_ACCESSKEY),
  },
  plugins: [react(), reactRefresh()],
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
    hmr: hmrConfig,
    proxy: {
      // Routes are kept separate on purpose
      "^/uploads(/|(\\?.*)?$)": proxyOptions,
      "^/auth(/|(\\?.*)?$)": proxyOptions,
      "^/apps(/|(\\?.*)?$)": proxyOptions,
      "^/proxy_route(/|(\\?.*)?$)": proxyOptions,
      "^/graphql(/|(\\?.*)?$)": proxyOptions,
      "^/webhooks(/|(\\?.*)?$)": proxyOptions,
      "^/gdpr(/|(\\?.*)?$)": proxyOptions,
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
