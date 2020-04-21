import builtins from 'rollup-plugin-node-builtins';
import resolve from '@rollup/plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import sourcemaps from 'rollup-plugin-sourcemaps';
import json from 'rollup-plugin-json';
import { uglify } from 'rollup-plugin-uglify';

import { version } from './package.json';
const { NODE_ENV } = process.env;

let plugins = [json(), resolve(), babel(), builtins()];
let outFileName = `dist/${version}/nimo-embed.js`;

if (NODE_ENV == 'production') {
  outFileName = `dist/${version}/nimo-embed.min.js`;
  plugins.push(uglify());
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
