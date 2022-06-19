import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  mode: "development",
  build:{
    sourcemap: "inline",
    outDir: path.resolve(__dirname, "src/editor"),
    emptyOutDir: false,
    lib: {
      entry: path.resolve(__dirname, "editor/App.tsx"),
      formats: ["iife"],
      name: "EditorBundle",
      fileName: (format) => `editor-bundle-${format}.js`
    },
  },
  
});