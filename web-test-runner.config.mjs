import { chromeLauncher } from '@web/test-runner-chrome';

export default {
  // Archivos de test
  files: 'test/**/*.spec.js',
  
  // Configuración del navegador
  browsers: [chromeLauncher()],
  
  // Directorio de trabajo
  rootDir: '.',
  
  // Configuración de módulos
  nodeResolve: true,
  
  // Coverage (comentado por ahora, activar si necesitas coverage)
  // coverage: true,
  // coverageConfig: {
  //   include: ['src/**/*.js'],
  //   exclude: ['src/**/*.styles.js'],
  //   threshold: {
  //     statements: 80,
  //     branches: 75,
  //     functions: 80,
  //     lines: 80,
  //   },
  // },
  
  // Configuración de testFramework (Mocha)
  testFramework: {
    config: {
      timeout: 3000,
      retries: 1,
    },
  },
  
  // Plugins
  plugins: [],
  
  // Configuración específica para desarrollo
  watch: true,
  
  // Puerto para el servidor de desarrollo
  port: 9000,
  
  // Configuración de archivos estáticos
  middleware: [],
  
  // Configuración de importMaps si es necesario
  // importMap: {
  //   imports: {
  //     // Aquí puedes agregar mapeos de imports si los necesitas
  //   }
  // }
};