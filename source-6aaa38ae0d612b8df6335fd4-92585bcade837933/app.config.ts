import { defineConfig } from '@tanstack/react-start/config'

export default defineConfig({
  server: {
    preset: 'netlify',
  },
  tsr: {
    routesDirectory: './src/routes',
    generatedRouteTree: './src/routeTree.gen.ts',
  },
})
