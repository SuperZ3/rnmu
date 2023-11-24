import { defineConfig } from 'vite';
import { glob } from 'glob';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import react from '@vitejs/plugin-react';

const workPath = process.cwd()

export default defineConfig({
  plugins: [react({ jsxRuntime: 'classic' })],
  json: {
    namedExports: true,
    stringify: false,
  },
  build: {
    lib: {
      entry: '',
      fileName: (format, entryName) => `${format}/[name].js`
    },
    rollupOptions: {
      external: [
        'react', 
        'react-native', 
        'react-dom',
      ],
      input: Object.fromEntries(
        glob.sync(`${workPath}/src/**/*.{ts,tsx}`, { ignore: `${workPath}/src/**/__tests__/*.*` }).map(file => [
            path.relative(
              `${workPath}/src`,
                file.slice(0, file.length - path.extname(file).length)
            ),
            fileURLToPath(new URL(file, import.meta.url))
        ])
      ),
      output: [
        {
          format: "es",
          entryFileNames: "[name].js",
          dir: path.resolve(workPath, `es`)
        },
        {
          format: "cjs",
          entryFileNames: "[name].js",
          exports: "named",
          dir: path.resolve(workPath, `lib`),
          globals: {
            'react': 'React',
            'react-dom': 'ReactDom',
            'react-native': 'ReactNative'
          }
        }
      ]
    },
    minify: false,
  },
});
