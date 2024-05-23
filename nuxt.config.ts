// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: [
    '@/assets/css/main.css',
    '@mdi/font/css/materialdesignicons.min.css'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: {
    global: true,
    dirs: ['@/components']
  },

  ssr: true,

  nitro: {
    prerender: {
      crawlLinks: true,
      failOnError: true
    }
  },

  postcss: {
    plugins: {
      'tailwindcss': {},
      'autoprefixer': {},
      'tailwindcss/nesting': 'postcss-nesting'
    }
  },

  typescript: {
    strict: true,
    typeCheck: true
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/google-fonts',
    'nuxt-swiper',
    'dayjs-nuxt',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    '@nuxtjs/supabase'
  ],

  devServer: {
    host: '0.0.0.0'
  },

  app: {
    head: {
      title: 'Memory Station',
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon.png' }
      ]
    },
    layoutTransition: { name: 'page', mode: 'out-in' },
    pageTransition: { name: 'page', mode: 'out-in' }
  },

  googleFonts: {
    download: true,
    display: 'swap',
    families: {
      Prompt: [100, 200, 300, 400, 500, 600, 700, 800, 900]
    }
  },

  dayjs: {
    locales: ['en', 'th'],
    plugins: ['relativeTime', 'utc', 'timezone', 'buddhistEra'],
    defaultLocale: 'th',
    defaultTimezone: 'Asia/Bangkok'
  }
})