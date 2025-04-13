// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/ui', '@nuxt/eslint', '@nuxtjs/mdc'],
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  mdc: {
    highlight: {
      theme: 'material-theme-palenight',
      langs: [
        'html',
        'markdown',
        'vue',
        'typescript',
        'javascript',
      ],
    },
  },
  runtimeConfig: {
    openaiApiKey: '',
  },
  future: {
    compatibilityVersion: 4,
  },
  compatibilityDate: '2024-11-01',
  eslint: {
    config: {
      stylistic: {
        indent: 2,
        semi: true,
      },
    },
  },
});
