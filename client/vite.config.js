import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  // define: {
  //   // Define your environment variables here
  //   "process.env.REACT_APP_API_URL": JSON.stringify(
  //     process.env.REACT_APP_API_URL
  //   ),
  //   // Add more variables as needed
  // },
  build: {
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name].js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name].[ext]'
      }
    }
  },
  plugins: [svgr(), react()],
  worker: {
    format: 'es', // This is important for using ES modules in workers
  },
});
