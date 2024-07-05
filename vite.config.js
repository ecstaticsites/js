import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import * as child from 'child_process'
import dayjs from 'dayjs'

const commitHash = child.execSync("git rev-parse --short HEAD").toString();
const commitRef = child.execSync("git rev-parse --abbrev-ref HEAD").toString();
const repo = `https://github.com/cloudybutnorain/js/tree/${commitHash}`
const today = dayjs().format('MMM D, YYYY');

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    minify: true,
  },
  define: {
    __COMMIT_HASH__: JSON.stringify(commitHash),
    __COMMIT_LINK__: JSON.stringify(repo),
    __BUILD_DATE__: JSON.stringify(today),
  },
  plugins: [svelte()],
})
