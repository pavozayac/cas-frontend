import { defineConfig } from 'vite'
import svelte from '@sveltejs/vite-plugin-svelte'
import tsconfigpaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [tsconfigpaths(), svelte()]
})
