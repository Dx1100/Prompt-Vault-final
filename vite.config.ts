import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // Tells Vite to look in the current folder for files like App.tsx and index.html
  root: './',
  
  resolve: {
    alias: {
      // Allows you to use '@' to refer to your main folder in imports
      '@': path.resolve(__dirname, './'),
    },
  },

  build: {
    // Standard folder for Vercel to find your finished website
    outDir: 'dist',
    // Cleans the old folder before building a new one
    emptyOutDir: true,
    // Ensures Vite finds your index.html at the root
    rollupOptions: {
      input: path.resolve(__dirname, 'index.html'),
    },
  },

  // Note: Local proxy settings are removed because Vercel handles 
  // connections through Environment Variables and API routes instead.
});
