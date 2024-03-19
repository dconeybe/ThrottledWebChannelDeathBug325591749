import { RollupOptions } from 'rollup';

import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import sourcemaps from 'rollup-plugin-sourcemaps';
import typescriptPlugin from 'rollup-plugin-typescript2';

const config: RollupOptions = {
  input: 'src/browser/index.ts',
  output: {
    file: 'dist/bundle.browser.js',
    format: 'es',
    sourcemap: true
  },
  plugins: [
    sourcemaps(),
    resolve({ browser: true, exportConditions: ['development'] }),
    typescriptPlugin({ exclude: '**/node/**' }),
    commonjs()
  ]
};

export default config;
