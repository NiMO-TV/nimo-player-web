import nodePolyfills from 'rollup-plugin-node-polyfills';
import resolve from '@rollup/plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import sourcemaps from 'rollup-plugin-sourcemaps';
import { terser } from 'rollup-plugin-terser';

import { version } from './package.json';
const { NODE_ENV } = process.env;

let plugins = [resolve(), babel(), nodePolyfills()];
let outFileName = `dist/embed-player-${version}.js`;

if (NODE_ENV == 'production') {
  outFileName = `dist/embed-player-${version}.min.js`;
  plugins.push(terser());
  plugins.push(sourcemaps());
}

module.exports = {
  input: 'src/index.js',
  output: [
    {
      file: outFileName,
      format: 'umd',
      name: 'NimoTV',
      sourcemap: true,
    },
  ],
  watch: {
    include: 'src/**',
  },
  plugins,
};
