export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "Zivik Bank Internation.",
    htmlAttrs: {
      lang: "en",
      "data-wf-domain": "investment-admin.webflow.io",
      "data-wf-page": "63f116b57a954c8539843cb8",
      "data-wf-site": "63f116b57a954c6732843cb7",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
      {
        name: "description",
        content:
          "The best online banking for fast local & international transactions without limits...",
      },
      {
        property: "og:description",
        content:
          "The best online banking for fast local & international transactions without limits...",
      },
      {
        property: "og:image",
        content:
          "https://uploads-ssl.webflow.com/63f116b57a954c6732843cb7/63f15d307d7541870aab3e0b_Kenny-Logo%20(1)-p-500.png",
      },
      { property: "twitter:title", content: "Bank Manager" },
      {
        property: "twitter:image",
        content:
          "https://uploads-ssl.webflow.com/63f116b57a954c6732843cb7/63f15d307d7541870aab3e0b_Kenny-Logo%20(1)-p-500.png",
      },
      {
        property: "twitter:description",
        content:
          "The best online banking software to manage and automate banking activities...",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],

    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      { rel: "stylesheet", type: "text/css", href: "/css/main.css" },
      { rel: "stylesheet", type: "text/css", href: "/css/custom.css" },
      { href: "https://fonts.googleapis.com", rel: "preconnect" },
      {
        href: "https://fonts.gstatic.com",
        rel: "preconnect",
        crossorigin: "anonymous",
      },
    ],

    script: [
      {
        src: "https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js",
        type: "text/javascript",
      },
      { src: "/scripts/touch.js", type: "text/javascript" },
      { src: "/scripts/query.js", type: "text/javascript" },
      { src: "/scripts/smartSupp.js", type: "text/javascript" },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: "~/plugins/fontLoader.js", mode: "client" },
    { src: "~/plugins/dashboardFontLoader.js", mode: "client" },
  ],

  router: {
    base: "/",
    middleware: ["isAuthenticated"],
  },

  auth: {
    strategies: {
      local: {
        // scheme: 'refresh'
        token: {
          property: "token",
          global: true,
          required: true,
          type: "Bearer",
        },
        user: {
          property: "user",
          autoFetch: true,
        },

        endpoints: {
          login: { url: "/users/login", method: "post" },
          logout: false,
          user: { url: "/users/get-user", method: "get" },
        },
      },
    },
  },

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ["@nuxtjs/axios", "@nuxtjs/auth"],

  generate: {
    routes: [
      // Add the confirmation route to the generated routes
    ],
  },

  axios: {
    baseURL: "https://twist.up.railway.app/api",
  },

  publicRuntimeConfig: {
    FILE_URL: "https://twist.up.railway.app/uploads",
  },

  // axios: {
  //   baseURL: process.env.API_DEV_URL,
  // },

  // publicRuntimeConfig: {
  //   FILE_URL: process.env.FILE_DEV_URL,
  // },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  target: "static",
};
