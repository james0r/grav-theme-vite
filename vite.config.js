import { defineConfig } from 'vite'
import laravel from 'laravel-vite-plugin'
import fs from 'fs'
import { resolve } from 'path'
import postcssImport from 'postcss-import';
import tailwindcssNesting from 'tailwindcss/nesting';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

export default defineConfig({
  base: '',
  build: {
    emptyOutDir: true,
    manifest: 'manifest.json',
    outDir: 'build',
    assetsDir: 'assets'
  },
  server: {
    host: "0.0.0.0",
    https: false,
    hmr: {
      host: 'localhost',
    },
  },
  css: {
    postcss: {
      plugins: [
        postcssImport,
        tailwindcssNesting,
        tailwindcss(resolve(__dirname, './tailwind.config.js')),
        autoprefixer
      ]
    }
  },
  plugins: [
    laravel({
      hotFile: 'build/hot',
      input: [
        './src/theme.js',
        './src/theme.css',
        // 'src/scss/theme.scss'
      ],
      refresh: [
        '../../config/**/*.yaml',
        '../../pages/**/*.md',
        './blueprints/**/*.yaml',
        './src/**/*.js',
        './src/**/*.css',
        './templates/**/*.twig',
        './grav-theme-vite.yaml',
        './grav-theme-vite.php'
      ]
    })
  ],
  resolve: {
    alias: [
      {
        find: /~(.+)/,
        replacement: process.cwd() + '/node_modules/$1'
      },
    ]
  }
})
