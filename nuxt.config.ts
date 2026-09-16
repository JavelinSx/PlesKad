// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  devtools: { enabled: false },

  devServer: {
    host: "0.0.0.0",
  },

  modules: ["@pinia/nuxt", "@nuxt/ui", "@nuxt/fonts", "@vueuse/motion/nuxt"],

  components: [{ path: "~/components", pathPrefix: false }],

  css: ["~/assets/css/main.css"],

  typescript: {
    strict: true,
  },

  runtimeConfig: {
    public: {
      siteUrl: process.env.SITE_URL || "https://pleskad.ru",
    },
  },

  app: {
    head: {
      htmlAttrs: {
        lang: "ru",
      },
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      title:
        "Кадастровые работы в Плесецком районе | ПлесКад - Кадастровый инженер",
      meta: [
        {
          name: "description",
          content:
            "Кадастровые работы в Плесецком районе Архангельской области: межевание земельных участков, технические планы, геодезия, консультации.",
        },
        { name: "author", content: "ПлесКад" },
        { name: "robots", content: "index, follow" },
        { property: "og:title", content: "Кадастровые услуги в Плесецком районе | ПлесКад" },
        {
          property: "og:description",
          content:
            "Профессиональные кадастровые услуги в Плесецком районе: межевание, технические планы, геодезия, консультации.",
        },
        { property: "og:type", content: "website" },
        { property: "og:locale", content: "ru_RU" },
        { property: "og:site_name", content: "ПлесКад" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "theme-color", content: "#22c55e" },
        { name: "msapplication-TileColor", content: "#22c55e" },
        { name: "msapplication-config", content: "/browserconfig.xml" },
      ],
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
        { rel: "icon", type: "image/png", sizes: "96x96", href: "/favicon-96x96.png" },
        { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
        { rel: "manifest", href: "/site.webmanifest" },
      ],
    },
    baseURL: "/",
  },

  nitro: {
    preset: "static",
    compressPublicAssets: true,
    minify: true,
  },

  ssr: false,

  experimental: {
    payloadExtraction: false,
  },

  compatibilityDate: "2025-06-14",
});
