import dotenv from 'dotenv';

dotenv.config();

export default {
  /*
  ** Nuxt target
  ** See https://nuxtjs.org/api/configuration-target
  */
  target: 'server',

  /*
  ** Headers of the page
  ** See https://nuxtjs.org/api/configuration-head
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' },
      { title: 'Remote Video' },
      { keywords: 'Remote-Control, HTML5 Remote,' },
    ],
    link: [{ rel: 'icon', type: 'image/svg', href: '/favicon.svg' }],
  },

  /*
  ** Global CSS
  */
  css: [
    '@/assets/css/app.css',
  ],

  /*
  ** Plugins to load before mounting the App
  ** https://nuxtjs.org/guide/plugins
  */
  plugins: [
  ],

  /*
  ** Auto import components
  ** See https://nuxtjs.org/api/configuration-components
  */
  components: true,

  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxtjs/tailwindcss',
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://http.nuxtjs.org
    '@nuxt/http',
    [
      'nuxt-fontawesome',
      {
        component: 'fa',
        imports: [
          {
            set: '@fortawesome/free-solid-svg-icons',
            icons: [
              'faVolumeUp',
              'faVolumeDown',
              'faPause',
              'faPlay',
              'faForward',
              'faVolumeMute',
              'faStepBackward',
            ],
          },
        ],
      },
    ],
    'nuxt-svg-loader',
  ],

  /*
  ** Server Middleware
  */
  serverMiddleware: {
    '/api': '~/api',
  },

  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  build: {
  },
  server: {
    host: process.env.HOST || 'http://127.0.0.1:9000',
    port: process.env.PORT_FRONTEND || '9000',
  },
};
