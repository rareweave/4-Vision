// https://nuxt.com/docs/api/configuration/nuxt-config
import { nodePolyfills } from "vite-plugin-node-polyfills";
export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss", "nuxt-lazy-load"],
  mode: "spa",
  ssr: false,
  typescript: false,
  target: "static",
  css: ["~/public/css/style.css", "~/assets/fonts.css"],
  app: {
    head: {
      link: [
        {
          rel: "icon",
          type: "image/x-icon",
          href: "/favicon.ico",
        },
      ],
      title: "4 Vision",
    },
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  nitro: {
    prerender: {
      ignore: ["404.html"],
    },
  },
  builder: "vite",
  experimental: {
    payloadExtraction: false,
  },
  generate: {
    fallback: "index.html",
  },
  vite: {
    plugins: [
      nodePolyfills({
        // To exclude specific polyfills, add them to this list.
        exclude: [
          "fs", // Excludes the polyfill for `fs` and `node:fs`.
        ],
        // Whether to polyfill specific globals.
        globals: {
          Buffer: true, // can also be 'build', 'dev', or false
          global: true,
          process: true,
        },
        // Whether to polyfill `node:` protocol imports.
        protocolImports: true,
      }),
    ],
    build: {
      rollupOptions: {
        output: {
          // manualChunks: {
          //   jsonWorker: [`monaco-editor/esm/vs/language/json/json.worker`],
          //   cssWorker: [`monaco-editor/esm/vs/language/css/css.worker`],
          //   htmlWorker: [`monaco-editor/esm/vs/language/html/html.worker`],
          //   tsWorker: [`monaco-editor/esm/vs/language/typescript/ts.worker`],
          //   jsWorker: [`/monaco-editor/esm/vs/basic-languages/javascript`],
          //   editorWorker: [`monaco-editor/esm/vs/editor/editor.worker`],
          // },
        },
      },
    },
  },
});
