const pkg = require('./package')
import serveStatic from 'serve-static'

module.exports = {
  mode: 'spa',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }],
  },

  /*
  ** Customize the progress-bar color
  */
  loading: {
    color: '#4fc08d',
    height: '5px',
  },

  /*
  ** Global CSS
  */
  css: [],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: ['~/plugins/global-components.js'],

  /*
  ** Nuxt.js modules
  */
  modules: ['@nuxtjs/apollo'],

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
        })
      }
    },
  },
  apollo: {
    clientConfigs: {
      default: '~/plugins/apollo-default-config.js',
    },
  },
  serverMiddleware: [
    {
      path: '/fonts',
      handler: serveStatic(__dirname + '/fonts', {
        setHeaders: (res, path) => {
          res.setHeader('Content-Type', serveStatic.mime.lookup(path))
        },
      }),
    },
  ],
}
