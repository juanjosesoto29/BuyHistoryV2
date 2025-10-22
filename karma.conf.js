// karma.conf.js  (ESM porque tienes "type":"module" en package.json)
import karmaVite from "karma-vite";              // 👈 IMPORTA el plugin Vite
// Los demás los puede resolver por nombre (strings) sin import explícito

export default function (config) {
  config.set({
    frameworks: ["jasmine"],

    files: [
      "src/tests/**/*.test.js",
      "src/tests/**/*.test.jsx",
    ],

    preprocessors: {
      "src/tests/**/*.test.js": ["vite"],
      "src/tests/**/*.test.jsx": ["vite"],
    },

    // 👇 Aquí registramos el objeto del plugin vite (no solo el string)
    plugins: [
      "karma-jasmine",
      "karma-chrome-launcher",
      karmaVite, // ← esto evita "Cannot load 'vite', it is not registered!"
    ],

    browsers: ["ChromeHeadless"],
    reporters: ["progress"],
    vite: {
      // Esto usa la API ESM de Vite y evita problemas con CJS deprecated
      logLevel: "info",
      mode: "test",
    },
    singleRun: false,
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    client: { clearContext: false },
  });
}
