import { babel } from '@rollup/plugin-babel';
import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json';

const external = [
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.peerDependencies || {}),
  /@babel\/runtime/,
  'react/jsx-runtime',
];

const input = './lib/index.ts';

const plugins = [
  babel({
    babelHelpers: 'runtime',
    extensions: ['.js', '.jsx', '.es6', '.es', '.mjs'],
  }),
  typescript({
    tsconfig: './tsconfig.json',
    typescript: require('typescript'),
  }),
];

const rollupConfig = [
  {
    input,
    output: {
      file: pkg.module,
      format: 'esm',
      sourcemap: true,
    },
    plugins,
    external,
  },
  {
    input,
    output: {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true,
    },
    plugins,
    external,
  },
];

export default rollupConfig;
