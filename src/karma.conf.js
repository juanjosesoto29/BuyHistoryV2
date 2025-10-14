// karma.conf.js

module.exports = function(config) {
  config.set({
    frameworks: ["jasmine"],
    files: [
        // Asegúrate de que los archivos de prueba existan en esta ruta
        "src/tests/**/*.test.js",
        "src/tests/**/*.test.jsx"
    ],
    preprocessors: {
      // Usa Vite para pre-procesar los archivos de prueba
      "src/tests/**/*.test.js": ["vite"],
      "src/tests/**/*.test.jsx": ["vite"],
    },
    browsers: ["Chrome"],
    reporters: ["progress"],

    // Configuración para que Karma sepa cómo usar Vite
    vite: {
        // Opciones de configuración de Vite para el entorno de prueba
        // (puedes añadir plugins de vite, etc. aquí si es necesario)
        logLevel: 'info',
        mode: 'test', // Es importante para que Vite sepa que está en modo de prueba
    },

    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    singleRun: false,
    concurrency: Infinity,
  });
};