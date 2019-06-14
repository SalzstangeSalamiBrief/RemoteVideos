const pkg = require('./package');

module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description },
      { title: 'Remote Video' },
      { keywords: 'Remotecontrol, HTML5 Remote,' },
    ],
    link: [{ rel: 'icon', type: 'image/svg', href: '/favicon.svg' }],
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: ['~/assets/css/tailwind.css', '~/assets/css/app.css'],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [],

  /*
  ** Nuxt.js modules
  */
  modules: [
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
            ],
          },
        ],
      },
    ],
    'nuxt-svg-loader',
  ],
  // register express middleware to run before each route
  serverMiddleware: [],

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
        });
      }
    },
  },
  env: {
    HOST: process.env.HOST || 'http://127.0.0.1:9000',
    PORT: process.env.PORT || '9000',
  },
};
