import { defineConfig } from 'vite'
import { createHtmlPlugin } from 'vite-plugin-html'

const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1]
const base = process.env.GITHUB_ACTIONS && repoName ? `/${repoName}/` : './'

export default defineConfig({
  base,
  plugins: [
    createHtmlPlugin({
      minify: true,
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {},
    },
  },
  server: {
    hmr: true,
  },
  build: {
    target: 'es2019',
  },
})
