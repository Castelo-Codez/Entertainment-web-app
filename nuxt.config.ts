// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: "2024-04-03",
    devtools: {enabled: false},
    modules: [
        "@nuxtjs/color-mode",
        "@nuxtjs/tailwindcss",
        "@sidebase/nuxt-auth",
    ],
    colorMode: {
        preference: "system", // default value of $colorMode.preference
        fallback: "light", // fallback value if not system preference found
        hid: "nuxt-color-mode-script",
        globalName: "__NUXT_COLOR_MODE__",
        componentName: "ColorScheme",
        classPrefix: "",
        classSuffix: "",
        storage: "localStorage", // or 'sessionStorage' or 'cookie'
        storageKey: "nuxt-color-mode",
    },
    auth: {
        isEnabled: true,
        originEnvKey: process.env.AUTH_KEY,
        baseURL: process.env.VERCEL_URL
            ? `https://${process.env.VERCEL_URL}/api/auth`
            : undefined,
        provider: {
            type: "authjs",
            trustHost: false,
        },
    },
    shadcn: {
        /**
         * Prefix for all the imported component
         */
        prefix: "",
        /**
         * Directory that the component lives in.
         * @default "./components/ui"
         */
        componentDir: "./components/ui",
    },
});
