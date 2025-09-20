
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  server: {
    host: '0.0.0.0',
    port: 8080,
    strictPort: true,
    hmr: {
      clientPort: 443,
      protocol: 'wss'
    }
  },
  build: {
    // Optimisation de la taille du bundle
    rollupOptions: {
      output: {
        manualChunks: {
          // Séparer les librairies volumineuses
          'react-vendor': ['react', 'react-dom'],
          'ui-vendor': ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu', '@radix-ui/react-toast'],
          'chart-vendor': ['recharts'],
          'router-vendor': ['react-router-dom'],
          'query-vendor': ['@tanstack/react-query'],
          'supabase-vendor': ['@supabase/supabase-js', '@supabase/auth-helpers-react']
        }
      }
    },
    // Minification plus rapide pour le développement
    minify: mode === 'production' ? 'esbuild' : false,
    // Optimiser le chunking
    chunkSizeWarningLimit: 1000
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Optimisation du développement
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      '@tanstack/react-query',
      'recharts'
    ]
  }
}));
