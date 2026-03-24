import { defineConfig } from 'vite'
import { resolve } from 'path'
import { readFileSync } from 'fs'

function layoutPlugin() {
  const layoutPath = resolve(__dirname, '_layout.html')

  return {
    name: 'layout',
    transformIndexHtml: {
      order: 'pre',
      handler(html) {
        const layout = readFileSync(layoutPath, 'utf-8')

        const title = (html.match(/<!--\s*title:\s*(.+?)\s*-->/) || [])[1] || 'Nina Scibelli, LMT, MLD-c'
        const content = (html.match(/<!--\s*content\s*-->([\s\S]*?)<!--\s*\/content\s*-->/) || [])[1] || ''
        const nav = (html.match(/<!--\s*nav\s*-->([\s\S]*?)<!--\s*\/nav\s*-->/) || [])[1] || ''

        return layout
          .replace('<!-- TITLE -->', title)
          .replace('<!-- CONTENT -->', content)
          .replace('<!-- NAV -->', nav)
      },
    },
  }
}

export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/nina-scibelli/' : '/',
  plugins: [layoutPlugin()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about/index.html'),
        services: resolve(__dirname, 'services/index.html'),
      },
    },
  },
})
